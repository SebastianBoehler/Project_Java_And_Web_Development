"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/hooks/ssr_hooks";

interface DeleteProductButtonProps {
  productId: number;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsDeleting(true);
    
    try {
      // In a real app, this would call an API endpoint to delete the product
      // For now, we'll just show a success message
      console.log('Deleting product with ID:',productId)
      await deleteProduct(productId)
      
      alert("Product deleted successfully!");
      router.refresh(); // Refresh the page to update the product list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
