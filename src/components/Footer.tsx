'use client';

import Link from 'next/link';
import { Heart } from './icons/Heart';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Made with love text */}
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            Made with <Heart /> in Stuttgart for my IU project
          </div>
          
          {/* Admin panel link */}
          <Link 
            href="/admin" 
            className="text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
