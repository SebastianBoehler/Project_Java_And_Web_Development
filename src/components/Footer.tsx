import { Heart } from './icons/Heart';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-light dark:bg-surface-dark py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Made with love text */}
          <div className="text-text-light-secondary dark:text-text-dark-secondary text-sm mb-4 md:mb-0">
            Made with <Heart /> in Stuttgart for my IU project
          </div>
          
          {/* Admin panel link */}
          <Link 
            href="/admin" 
            className="bg-gray-200 dark:bg-gray-700 text-text-light-primary dark:text-text-dark-primary hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
