import type { CreateProductData, Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAdminProducts() {
    const response = await fetch(`${API_URL}/admin/products`, {
        credentials: "include",
    });
    if (response.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!response.ok) {
        throw new Error("Failed to fetch admin products");
    }

    return response.json();
}

export async function createProduct(data: CreateProductData) {
    const response = await fetch(`${API_URL}/admin/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create product");
    }

    return response.json();
}

export async function fetchAdminProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch admin product");
    }

    return response.json();
}

export async function updateProduct(id: string, data: CreateProductData): Promise<Product> {
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update product");
    }

    return response.json();
}

export async function deleteProduct(id: string) {
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
}