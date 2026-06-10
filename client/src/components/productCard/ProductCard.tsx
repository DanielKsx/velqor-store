import styles from './ProductCard.module.scss';
import type { Product } from "../../types/product";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.mainImage}`} alt={product.name} className={styles.image}/></div>

            <div className={styles.content}>
                <h2 className={styles.name}>{product.name}</h2>
                <p className={styles.price}>{Number(product.price).toFixed(2)} PLN</p>
            </div>
        </article>
    );
}

export default ProductCard;