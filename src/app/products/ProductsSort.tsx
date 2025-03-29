"use client";

/*
  Must be client side due to useState and useEffect, otherwise the user could
  not apply sorting
*/

import { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

interface ProductsSortProps {
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

const ProductsSort = ({ products }: ProductsSortProps) => {
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    const result = [...products];
    
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    
    setSortedProducts(result);
  }, [products, sortOption]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          Showing {sortedProducts.length} products
        </div>
        
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSort;
