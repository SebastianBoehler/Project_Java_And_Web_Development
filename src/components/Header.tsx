'use server';

import Link from 'next/link';
import { getCartItemCount } from '@/hooks/ssr_hooks';
import CartButton from './CartButton';

export default async function Header() {
  // Get cart count from SSR hook
  const cartItemCount = await getCartItemCount();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background-light dark:bg-background-dark shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Shop Name */}
          <Link href="/" className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary hover:text-primary-light dark:hover:text-primary-dark transition-colors">
            Sebastian&apos;s
          </Link>
          
          {/* Shopping Cart Button - Client Component */}
          <CartButton cartItemCount={cartItemCount} />
          
          {/* Navigation Links - Absolutely positioned in center */}
          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex space-x-6">
              <Link 
                href="/" 
                className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"
              >
                Products
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
