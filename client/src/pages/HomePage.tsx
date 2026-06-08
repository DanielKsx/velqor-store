import { useState, useEffect } from "react";
import { fetchProducts } from "../api/productsApi";
import type { Product } from "../types/product";

function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error(error)
            }
        }
        loadProducts();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Products count: {products.length}</p>
        </div>
    )
}

export default HomePage;