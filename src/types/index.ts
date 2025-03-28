export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    slug: string;
    variants: ProductVariant[];
}

export interface ProductVariant {
    id: number;
    name: string;
    price: number;
    image: string;
}