'use client';

import { ShoppingCart } from './icons/ShoppingCart';
import { useSidebar } from '@/context/SidebarContext';

interface CartButtonProps {
  cartItemCount: number;
}

export default function CartButton({ cartItemCount }: CartButtonProps) {
  const { toggleSidebar } = useSidebar();
  
  return (
    <button 
      onClick={toggleSidebar}
      className="relative p-2 text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart />
      {/* Cart Count Badge - Using standard Tailwind blue */}
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-[10px]">
          {cartItemCount > 99 ? '99+' : cartItemCount}
        </span>
      )}
    </button>
  );
}
