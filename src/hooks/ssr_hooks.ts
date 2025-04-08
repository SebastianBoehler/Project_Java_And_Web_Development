"use server";

import { Product } from "@/types";
import { unstable_noStore as noStore } from 'next/cache';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey)

/* 
  Server side hooks, will be executed on the server only because it communicates with the database
  and verifies admin password these are critical steps that should be protected 
*/


/**
 * Get the current shopping cart item count
 * @param sessionId parsed from cookie
 */
export async function getCartItemCount(sessionId: string): Promise<number> {
  noStore();
  const { data, error } = await supabase
    .from('cart')
    .select()
    .eq('sessionId', sessionId)
  
  if (error) {
    console.error(error);
    throw error;
  }

  const count = data.reduce((acc, item) => acc + item.quantity, 0);
  
  return count;
}

/**
 * Get the current shopping cart items
 * @param sessionId parsed from cookie
 * @returns array of products with quantity
 */
export async function getCartItems(sessionId: string) {
  noStore();
  const { data, error } = await supabase
    .from('cart')
    .select()
    .eq('sessionId', sessionId)
  
  if (error) {
    console.error(error);
    throw error;
  }
  
  const cart = data.map(item => ({
    productId: item.productId,
    quantity: item.quantity
  }));

  if (cart.length) {
    //get products with those productIds
    const { data: products, error } = await supabase
      .from('products')
      .select()
      .in('id', cart.map(item => item.productId));
    
    if (error) {
      console.error(error);
      throw error;
    }
    
    const mapped = products.map(product => ({
      ...product,
      quantity: cart.find(item => item.productId === product.id)?.quantity || 0
    }));
    return mapped
  }

  return []
}

/**
 * Add a product to the shopping cart
 * @param sessionId parsed from cookie
 * @param productId product id
 * @param quantity quantity of the product
 */
export async function addProductToCart(sessionId: string, productId: number, quantity: number) {
  //find row with session and product id then update quantity else insert row
  console.log('Adding product to cart', sessionId, productId, quantity);
  const { data: cart, error } = await supabase
    .from('cart')
    .select()
    .eq('sessionId', sessionId)
    .eq('productId', productId)
    .single();
  
  //ignore no rows error
  if (error && error.code !== 'PGRST116') {
    console.error(error);
    throw error;
  }
  
  if (!cart) {
    //create rnd id string
    const id = crypto.randomInt(1000000000).toString();
    const { data, error } = await supabase
      .from('cart')
      .insert({ id, sessionId, productId, quantity });

    console.log(data, error)
  } else {
    // update existing row
    quantity += cart.quantity;
    await supabase
      .from('cart')
      .update({ quantity })
      .eq('sessionId', sessionId)
      .eq('productId', productId);
  }
}

/**
 * Empty the shopping cart
 * deletes the cart document from the database
 * @param sessionId parsed from cookie
 */
export async function emptyCart(sessionId: string) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('sessionId', sessionId);
  
  if (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Get all products
 * @param limit optional limit of products to return
 * @returns array of products
 */
export async function getProducts(limit?: number): Promise<Product[]> {
  // needed since otherwise it would be cached, had this issue of not updating shown products
  // on /admin/products
  noStore();
  
  const { data: products, error } = await supabase
    .from('products')
    .select()
    .order('id', { ascending: true })
    .limit(limit ?? 100);
  
  if (error) {
    console.error(error);
    throw error;
  }
  return products;
}

/**
 * Get a product by id
 * @param id product id
 * @returns product or null if not found
 */
export async function getProductByID(id: number): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select()
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(error);
    throw error;
  }
  return product;
}

/**
 * Save a product
 * @param product product to save
 */
export async function saveProduct(product: Product): Promise<void> {
  const { error } = await supabase
    .from('products')
    .insert(product);
  
  if (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Delete a product
 * @param id product id
 */
export async function deleteProduct(id: number): Promise<void> {
  console.log('Deleting product:', id);
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;

  //delete image
  const { error: imageError } = await supabase
    .storage
    .from('images')
    .remove([`products/${id}`]);
  if (imageError) throw imageError;
}

/**
 * Save an image
 * @param id product id
 * @param blob image data
 * @returns public url of the image
 */
export async function saveImage(id: number, blob: Buffer): Promise<string> {
  const { data, error } = await supabase.storage
  .from('images')
  .upload(`products/${id}`, blob, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    console.error('Upload error:', error)
    throw error;
  } else {
    console.log('Uploaded:', data)

    // Save the path (data.path) in your products table
    const publicUrl = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    console.log('Public URL:', publicUrl.data.publicUrl)
    return publicUrl.data.publicUrl;
  }
}

/**
 * Check if the password is valid
 * @param hash hashed password
 * @returns true if the password is valid
 */
export async function isValidAdminPassword(hash: string): Promise<boolean> {
  const password = 'password';
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  const isValid = hashedPassword === hash;
  if (isValid) {
    //set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin', 'true', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 //1h
    });
  }
  return isValid;
}