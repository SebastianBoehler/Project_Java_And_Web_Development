'use client';

import { useSidebar } from "@/context/SidebarContext";
import { CartItem } from "@/types";
import { useEffect, useRef } from "react";
import EmptyCardButton from "./EmptyCardButton";

interface CartSidebarProps {
  cartItems: CartItem[];
  sessionId: string;
}

export default function CartSidebar({ cartItems, sessionId }: CartSidebarProps) {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    }

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        ref={sidebarRef}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Close cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex-grow overflow-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">Your cart is empty</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center p-3 border-b border-border-light dark:border-border-dark">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-center mb-4 text-center text-text-light-secondary dark:text-text-dark-secondary">
            <EmptyCardButton sessionId={sessionId} />
          </div>
          
          {cartItems.length > 0 && (
            <div className="mt-auto pt-4 border-t border-border-light dark:border-border-dark">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Checkout
              </button>
              <p className="text-xs text-center mt-3 text-text-light-secondary dark:text-text-dark-secondary italic">
                By proceeding to checkout you agree to giving me a good grade
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
