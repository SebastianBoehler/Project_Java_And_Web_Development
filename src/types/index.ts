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
}

export interface ShoppingCart {
    items: {id: number, quantity: number}[]
}