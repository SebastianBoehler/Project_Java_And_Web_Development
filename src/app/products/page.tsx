import { getProducts } from "@/hooks/ssr_hooks";
import ProductsSort from "./ProductsSort";

export default async function ProductsPage() {
    const products = await getProducts();
    
    return (    
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            
            <ProductsSort products={products} />
        </div>
    );
}