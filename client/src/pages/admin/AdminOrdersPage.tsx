import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdminOrders } from "../../api/adminOrdersApi";
import type { Order } from "../../types/orders";
import styles from "./AdminOrdersPage.module.scss";

function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrders() {
            try {
                const data = await fetchAdminOrders();
                setOrders(data);
            } catch {
                setError("Failed to load orders");
            } finally {
                setIsLoading(false);
            }
        }
        loadOrders();
    }, []);

    if (isLoading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Orders</h1>
                    <p className={styles.subtitle}> Manage customer orders.</p>
                </div>
            </div>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className={styles.orders}>
                    {orders.map((order) => (
                        <div key={order.id} className={styles.card}>
                            <div className={styles.info}>
                                <h2 className={styles.customer}> {order.customerName}</h2>
                                <p className={styles.meta}> {order.customerEmail}</p>
                                <p className={styles.meta}> {order.customerPhone}</p>
                                <p className={styles.meta}> {order.items.length} item(s)</p>
                                <Link to={`/admin/orders/${order.id}`} className={styles.viewButton}> View details</Link>
                            </div>
                            <div className={styles.summary}>
                                <p className={styles.status}> {order.status}</p>
                                <p className={styles.total}> {Number(order.totalPrice).toFixed(2)} PLN </p>
                                <p className={styles.meta}> {new Date(order.createdAt).toLocaleDateString()} </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default AdminOrdersPage;