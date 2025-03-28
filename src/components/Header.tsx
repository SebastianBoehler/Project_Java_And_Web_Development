'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from './icons/ShoppingCart';

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Shop Name */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
          Sebastian&apos;s
        </Link>
        
        {/* Navigation Links - can be expanded later */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-gray-900 ${pathname === '/' ? 'font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`text-gray-600 hover:text-gray-900 ${pathname === '/products' ? 'font-semibold' : ''}`}
            >
              Products
            </Link>
          </div>
        </nav>
        
        {/* Shopping Cart Button */}
        <Link 
          href="/cart" 
          className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Shopping cart"
        >
          <ShoppingCart />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
