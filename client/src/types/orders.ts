import type { ProductColor, ProductSize, UUID } from "./product";

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";

export type OrderItem = {
    id: UUID;
    orderId: UUID;
    productIdSnapshot: UUID;
    productNameSnapshot: string;
    productColorSnapshot: ProductColor;
    productSizeSnapshot: ProductSize;
    productPriceSnapshot: string;
    quantity: number;
    note?: string | null;
    totalPrice: string;
};

export type Order = {
    id: UUID;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    totalPrice: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
};