'use server';

import Link from 'next/link';
import { getCartItemCount } from '@/hooks/ssr_hooks';
import CartButton from './CartButton';
import { headers } from 'next/headers';
import { cookies } from 'next/headers'

export default async function Header() {
  // Get cart count from SSR hook
  
  // Get the current path from headers
  const cookieStore = await cookies();
  const headersList = await headers();
  const pathname = headersList.get('x-url') || '/';


  const sessionId = cookieStore.get('session-id')?.value || '';
  const cartItemCount = await getCartItemCount(sessionId);
  console.log('Shopping cart of user', sessionId, 'has', cartItemCount, 'items')
  
  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.endsWith(path);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Shop Name */}
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            Sebastian&apos;s
          </Link>
          
          {/* Shopping Cart Button - Client Component */}
          <CartButton cartItemCount={cartItemCount} />
          
          {/* Navigation Links - Absolutely positioned in center */}
          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex space-x-6">
              <Link 
                href="/" 
                className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive('/') ? 'underline underline-offset-4 decoration-2 decoration-blue-600 dark:decoration-blue-400' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive('/products') ? 'underline underline-offset-4 decoration-2 decoration-blue-600 dark:decoration-blue-400' : ''
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
