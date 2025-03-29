"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveProduct } from "@/hooks/ssr_hooks";
import { Product } from "@/types";

export default function CreateProductPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Please enter a product prompt");
      return;
    }

    setIsLoading(true);
    setError("");
    setPreviewProduct(null);
    
    try {
      // showcase client side fetch implementation
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      const { product } = await response.json() as { product: Product };
      if (product) setPreviewProduct(product);
      
    } catch {
      setError("An error occurred while creating the product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!previewProduct) return;
    
    setIsSaving(true);
    try {
      await saveProduct(previewProduct);
      router.push("/admin/products");
    } catch {
      setError("Failed to save the product");
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">
            Product Prompt
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., water bottle, hiking backpack, wireless headphones"
            className="w-full p-3 border rounded-md"
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Describe the product you want to create
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Product"}
        </button>
      </form>
      
      {isLoading && (
        <div className="text-center py-10">
          <p className="mt-2 text-gray-600">
            Creating your product with AI... This may take up to 30 seconds.
          </p>
        </div>
      )}
      
      {previewProduct && (
        <div className="border rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Product Preview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {previewProduct.image ? (
                <div className="relative w-full h-80">
                  <Image 
                    src={`data:image/jpeg;base64,${previewProduct.image}`} 
                    alt={previewProduct.name}
                    fill
                    className="object-contain rounded-md"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={previewProduct.image.startsWith('http')}
                  />
                </div>
              ) : (
                <div className="bg-gray-200 w-full h-80 flex items-center justify-center rounded-md">
                  No image available
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">{previewProduct.name}</h3>
              <p className="text-lg font-bold text-blue-600 mb-4">${previewProduct.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-6">{previewProduct.description}</p>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="text-black py-2 px-4 rounded-md border-2 border-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
