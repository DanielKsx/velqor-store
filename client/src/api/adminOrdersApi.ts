import type { Order, OrderStatus } from "../types/orders";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAdminOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/admin/orders`, {
        credentials: "include",
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error("Failed to fetch admin orders");
    }

    return response.json();
}

export async function fetchAdminOrderById(id: string): Promise<Order> {
    const response = await fetch(`${API_URL}/admin/orders/${id}`, {
        credentials: "include",
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error("Failed to fetch admin order");
    }

    return response.json();
}

export async function updateAdminOrderStatus(
    id: string,
    status: OrderStatus,
): Promise<Order> {
    const response = await fetch(`${API_URL}/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error("Failed to update order status");
    }

    return response.json();
}