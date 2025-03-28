"use client"
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
        <div className="relative h-64 bg-gray-200">
          {product.image ? (
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <button 
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation to product page
                // Wishlist functionality would go here
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description || "No description available"}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation to product page
                // Add to cart functionality would go here
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
