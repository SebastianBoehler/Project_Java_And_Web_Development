"use server";

import { MongoClient } from "mongodb";
import { Product, ShoppingCart } from "@/types";
import { Document } from "mongodb";
import { unstable_noStore as noStore } from 'next/cache';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const client = new MongoClient(process.env.MONGO_URL!);
await client.connect();

/**
 * Get the current shopping cart item count
 */
export async function getCartItemCount(sessionId: string): Promise<number> {
  const db = client.db('shop');
  const cart = await db.collection('cart').findOne<ShoppingCart>({ sessionId });
  if (!cart) return 0
  return cart.items.length;
}

/**
 * Get the current shopping cart items
 * @param sessionId parsed from cookie
 */
export async function getCartItems(sessionId: string) {
  const db = client.db('shop');
  const cart = await db.collection('cart').findOne<ShoppingCart>({ sessionId });
  if (!cart) return [];

  const pipeline: Document[] = [
    //products with matching ids
    { $match: { id: { $in: cart.items.map(item => item.id) } } },
    { $project: { _id: 0 } },
  ];

  const products = await db.collection('products')
    .aggregate<Product>(pipeline)
    .toArray();

  // add quantity from cart
  return products.map(product => ({
    ...product,
    quantity: cart.items.find(item => item.id === product.id)?.quantity || 0
  }));
}

export async function addProductToCart(sessionId: string, productId: number, quantity: number) {
  const db = client.db('shop');
  const cart = await db.collection('cart').findOne<ShoppingCart>({ sessionId });
  console.log('logging cart', cart)

  if (!cart) {
    await db.collection('cart').insertOne({ sessionId, items: [{ id: productId, quantity }] });
  } else {
    //check if item already in cart, increase quantity
    const item = cart.items.find(item => item.id === productId);
    console.log('item already in cart', item)
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ id: productId, quantity });
    }
    await db.collection('cart').updateOne({ sessionId }, { $set: { items: cart.items } });
  }
}

export async function emptyCart(sessionId: string) {
  const db = client.db('shop');
  await db.collection('cart').deleteOne({ sessionId });
}

export async function getProducts(limit?: number): Promise<Product[]> {
  // needed since otherwise it would be cached, had this issue of not updating shown products
  // on /admin/products
  noStore();
  
  const db = client.db('shop');

  const pipeline: Document[] = [
    { $project: { _id: 0 } },
  ];

  if (limit) {
    pipeline.push({ $limit: limit });
  }

  const products = await db.collection('products')
    .aggregate<Product>(pipeline)
    .toArray();
  return products;
}

export async function getProductByID(id: number): Promise<Product | null> {
  const db = client.db('shop');
  const product = await db.collection('products')
    .findOne<{_id?: number} & Product>({ id });
  if (product) delete product._id;
  return product;
}

export async function saveProduct(product: Product): Promise<void> {
  const db = client.db('shop');
  await db.collection('products').insertOne(product);
}

export async function deleteProduct(id: number): Promise<void> {
  const db = client.db('shop');
  await db.collection('products').deleteOne({ id });
}

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