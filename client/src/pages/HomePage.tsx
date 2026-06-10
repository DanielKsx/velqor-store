import styles from './HomePage.module.scss'
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/productCard/ProductCard";
import { Link } from "react-router-dom";
import Container from '../components/container/Container';

function HomePage() {
    const { products, isLoading, error } = useProducts();
    
    return (
        <main className={styles.homePage}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>VELQOR</h1>
                <p className={styles.heroSubtitle}>Premium StreetWear For Everyday Movement</p>
                <Link to="/" className={styles.heroButton}>Shop Now</Link>
            </section>
            <Container>
            <section className={styles.productsSection}>
                <h2 className={styles.sectionTitle}>Featured Products</h2>
                <div className={styles.productsGrid}>
                    {products.map((product) => (
                        <Link key={product.id} to={`/products/${product.slug}/${product.sku}`} className={styles.productLink}>
                            <ProductCard product={product} />
                        </Link>
                    ))}
                </div>
            </section>
            </Container>
        </main>
    )
}

export default HomePage;