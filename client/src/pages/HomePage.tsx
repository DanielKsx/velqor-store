import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/productCard/ProductCard";
import { Link } from "react-router-dom";

function HomePage() {
    const { products, isLoading, error } = useProducts();
    return (
        <div>
            <h1>Home Page</h1>
            {products.map((product) => (
                <Link key={product.id} to={`/products/${product.slug}/${product.sku}`}>
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    )
}

export default HomePage;