import { useEffect, useState } from "react";
import { fetchAdminProducts, deleteProduct } from "../../api/adminProductsApi";
import type { Product } from "../../types/product";
import styles from "./AdminProductPage.module.scss";
import { Link, useNavigate } from "react-router-dom";

function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            try {
                setIsLoading(true);
                setError("");

                const data = await fetchAdminProducts();
                setProducts(data);
            } catch (error) {
                if (error instanceof Error && error.message === "Unauthorized") {
                    navigate("/login");
                    return;
                }

                setError("Failed to load products");
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmed) {
            return;
        }
        try {
            await deleteProduct(id);
            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product.id !== id
                )
            );
        } catch {
            alert("Failed to delete product");
        }
    }

    return (
    <section>
        <div className={styles.header}>
            <h1 className={styles.title}>Products</h1>
            <Link to="/admin/products/new" className={styles.addButton}>Add Product</Link>
        </div>
        <div className={styles.products}>
            {products.map((product) => (
                <article key={product.id} className={styles.card}>
                    <div className={styles.productMain}>
                        <div className={styles.imageWrapper}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}${product.mainImage}`} alt={product.name} className={styles.productImage}/>
                        </div>
                        <div>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.productMeta}>SKU: {product.sku}</p>
                            <p className={styles.productPrice}> ${Number(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Link to={`/admin/products/${product.id}/edit`} className={styles.editButton} > Edit </Link>
                        <button type="button" className={styles.deleteButton} onClick={() => handleDelete(product.id)}> Delete </button>
                    </div>
                </article>
            ))}
        </div>
    </section>
);
}

export default AdminProductsPage;