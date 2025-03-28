"use server";

import { MongoClient } from "mongodb";
import { CartItem, Product } from "@/types";

const client = new MongoClient(process.env.MONGO_URL!);

/**
 * Get the current shopping cart item count
 */
export async function getCartItemCount(): Promise<number> {
  // Temporary implementation with mock data
  // In a real app, this would fetch from a database or API
  return 3; // Mock cart count for now
}

/**
 * Get the current shopping cart items
 */
export async function getCartItems(): Promise<CartItem[]> {
  // Temporary implementation with mock data
  return [
    { id: 1, name: 'Product 1', price: 19.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 2 },
  ];
}

export async function isAuthenticated(): Promise<boolean> {
  // Temporary implementation
  return false;
}

export async function getProducts(): Promise<Product[]> {
  await client.connect();
  const db = client.db('shop');
  const products = await db.collection('products')
    .find({})
    .project<Product>({ _id: 0 })
    .toArray();
  await client.close();
  return products;
}

export async function getProductByID(id: number): Promise<Product | null> {
  await client.connect();
  const db = client.db('shop');
  const product = await db.collection('products')
    .findOne<{_id?: number} & Product>({ id });
  await client.close();
  if (product) delete product._id;
  return product;
}

export async function saveProduct(product: Product): Promise<void> {
  await client.connect();
  const db = client.db('shop');
  await db.collection('products').insertOne(product);
  await client.close();
}

export async function deleteProduct(id: number): Promise<void> {
  await client.connect();
  const db = client.db('shop');
  await db.collection('products').deleteOne({ id });
  await client.close();
}
  