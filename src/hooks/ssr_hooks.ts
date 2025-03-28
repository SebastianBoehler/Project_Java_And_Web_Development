"use server";

import { MongoClient } from "mongodb";
import { Product, ShoppingCart } from "@/types";
import { Document } from "mongodb";

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
  