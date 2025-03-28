"use client";
import { useState } from "react";

interface EmptyCardButtonProps {
    sessionId: string;
}

export default function EmptyCardButton({ sessionId }: EmptyCardButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleEmptyCart = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId }),
            });

            if (!response.ok) {
                throw new Error('Failed to empty cart');
            }

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error emptying cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
        onClick={handleEmptyCart}
        disabled={isLoading}
        className="text-black dark:text-white tetx-underline"
        >
        {isLoading ? 'Emptying...' : 'Empty Cart'}
        </button>
    )
}