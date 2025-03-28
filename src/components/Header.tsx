'use server';

import Link from 'next/link';
import { getCartItemCount } from '@/hooks/ssr_hooks';
import CartButton from './CartButton';
import { headers } from 'next/headers';

export default async function Header() {
  // Get cart count from SSR hook
  const cartItemCount = await getCartItemCount();
  
  // Get the current path from headers
  const headersList = await headers();
  const pathname = headersList.get('x-url') || '/';
  console.log(pathname);
  
  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
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
                className={`text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors ${
                  isActive('/') ? 'underline underline-offset-4 decoration-2' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors ${
                  isActive('/products') ? 'underline underline-offset-4 decoration-2' : ''
                }`}
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
