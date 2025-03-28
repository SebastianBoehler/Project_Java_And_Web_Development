import Header from "@/components/Header";
import { SidebarProvider } from "@/context/SidebarContext";
import CartSidebarWrapper from "@/components/CartSidebarWrapper";
import { getProducts } from "@/hooks/ssr_hooks";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();
  
  return (
    <SidebarProvider>
      <Header />
      <CartSidebarWrapper />
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Sebastian&apos;s</h1>
          <p className="text-xl mb-8 max-w-2xl">Discover our exclusive collection of premium products crafted for quality and style.</p>
          <div className="flex gap-4">
            <Link href="/products" className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 shadow-lg">
              Discover Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Two-Column Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Title and Description */}
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-4">Student Offer</h2>
              <p className="text-xl mb-3">Give this project a good grade and receive a special 20% discount!</p>
              <p className="text-lg italic">Plus a mysterious goody with your next order... no pressure though!</p>
            </div>
            
            {/* Right Column - Amazing Deals Section */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-blue-700 text-2xl font-bold mb-4 text-center">A+ = Amazing Deals</h3>
                <p className="text-gray-700 mb-4 text-center">Use promo code <span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-600 font-bold">BESTGRADE</span> at checkout</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 w-full">
                  I Promise To Give A Good Grade
                </button>
                <p className="text-gray-500 text-sm mt-3 text-center">* Terms and conditions apply. Discount only valid for professors grading this project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SidebarProvider>
  );
}
