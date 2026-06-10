import type { CartItem } from "../store/slices/cartSlice"

type CreateOrderPayload = {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: Pick<CartItem, "productId" | "color" | "size" | "quantity" | "note">[];
};

export async function createOrder(payload: CreateOrderPayload) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Could not place order");
    }

    return response.json();
}