import { getProductByID } from '@/hooks/ssr_hooks';
import { headers } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductByID(Number(slug))
  console.log({slug, product})

  const headersList = await headers();
  const cookieHeader = headersList.get('cookie');
  const cookies = cookieHeader?.split(';')
  const sessionId = cookies?.find(cookie => cookie.includes('session-id='))?.split('=')[1] || '';
  
  // If product not found, show 404
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex items-center justify-center h-[500px] bg-transparent rounded-lg">
          {product.image ? (
            <div className="relative w-full h-full max-w-[400px] mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No image available</p>
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col max-w-md mx-auto w-full px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <div className="prose dark:prose-invert mb-6">
            <p>{product.description}</p>
          </div>
          
          {/* Add to Cart Button */}
          <AddToCartButton 
            sessionId={sessionId}
            productId={product.id}
          />
        </div>
      </div>
    </div>
  );
}
