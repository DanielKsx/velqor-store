import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}

export async function fetchProductBySlugAndSku(slug: string, sku: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${slug}/${sku}`)

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return response.json();
}