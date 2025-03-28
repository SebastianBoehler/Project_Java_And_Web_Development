'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  sessionId: string;
  productId: number;
  quantity?: number;
}

export default function AddToCartButton({ 
  sessionId, 
  productId, 
  quantity = 1 
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!sessionId) {
      console.error('No session ID available');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      if (response.ok) {
        window.location.reload();

      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-blue-400"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
