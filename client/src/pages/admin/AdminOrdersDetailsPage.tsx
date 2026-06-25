import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdminOrderById, updateAdminOrderStatus } from "../../api/adminOrdersApi";
import type { Order, OrderStatus } from "../../types/orders";
import styles from "./AdminOrderDetailsPage.module.scss";
import { Link } from "react-router-dom";


function AdminOrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!id) {
            setError("Order not found");
            setIsLoading(false);
            return;
        }
        const orderId = id;

        async function loadOrder() {
            try {
                const data = await fetchAdminOrderById(orderId);
                setOrder(data);
            } catch {
                setError("Failed to load order");
            } finally {
                setIsLoading(false);
            }
        }
        loadOrder();
    }, [id]);

    async function handleStatusChange(status: OrderStatus) {
        if (!order) {
            return;
        }
        try {
            setIsUpdating(true);
            const updatedOrder = await updateAdminOrderStatus(order.id, status);
            setOrder(updatedOrder);
        } catch {
            setError("Failed to update order status");
        } finally {
            setIsUpdating(false);
        }
    }

    if (isLoading) {
        return <p>Loading order...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Order not found</p>;
    }

    return (
        <div className={styles.page}>
            <Link to="/admin/orders" className={styles.backButton}>  ← Back to Orders</Link>
            <h1 className={styles.title}>Order Details</h1>
            <div className={styles.topSection}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Customer</h2>
                    <p><strong>Name:</strong> {order.customerName}</p>
                    <p><strong>Email:</strong> {order.customerEmail}</p>
                    <p><strong>Phone:</strong> {order.customerPhone}</p>
                    <p><strong>Address:</strong> {order.customerAddress}</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Order</h2>

                    <label htmlFor="orderStatus"> <strong>Status</strong> </label>
                    <select id="orderStatus" className={styles.statusSelect} value={order.status} disabled={isUpdating} onChange={(event) => handleStatusChange(event.target.value as OrderStatus)}>
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                    {isUpdating && <p>Updating status...</p>}
                    <p><strong>Total:</strong> {Number(order.totalPrice).toFixed(2)} PLN </p>
                    <p> <strong>Created:</strong> {new Date(order.createdAt).toLocaleString()} </p>
                </section>
            </div>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Items</h2>

                <div className={styles.items}>
                    {order.items.map((item) => (
                        <div key={item.id} className={styles.itemCard}>
                            <h3>{item.productNameSnapshot}</h3>
                            <p><strong>Color:</strong> {item.productColorSnapshot}</p>
                            <p> <strong>Size:</strong> {item.productSizeSnapshot}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p> <strong>Price:</strong> {Number(item.productPriceSnapshot).toFixed(2)} PLN </p>
                            <p><strong>Total:</strong> {Number(item.totalPrice).toFixed(2)} PLN</p>
                            {item.note && (
                                <p className={styles.note}>
                                    <strong>Note:</strong> {item.note}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AdminOrderDetailsPage;