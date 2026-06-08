import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(): Promise<Product[]>{
    const response = await fetch(`${API_URL}/products`);

    if(!response.ok){
        throw new Error('failed to fetch products');
    }

    return response.json();
}