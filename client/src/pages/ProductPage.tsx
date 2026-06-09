import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchProductBySlugAndSkuThunk } from "../store/slices/productsSlice";
import Container from "../components/container/Container";
import styles from './ProductPage.module.scss'

function ProductPage() {
    const { slug, sku } = useParams();
    const dispatch = useAppDispatch();
    const { selectedProduct, isLoading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (!slug || !sku) {
            return;
        }

        dispatch(fetchProductBySlugAndSkuThunk({ slug, sku }));
    }, [dispatch, slug, sku]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!selectedProduct) {
        return <p>Product not found</p>;
    }
    return (
        <Container>
            <section className={styles.productPage}>
                <div className={styles.imageSection}>
                    <div className={styles.mainImage}>
                        Product Image
                    </div>
                </div>
                <div className={styles.detailsSection}>
                    <div className={styles.productInfo}>
                        <div className={styles.productHeader}>
                            <h1 className={styles.productTitle}>{selectedProduct.name}</h1>
                            <p className={styles.productPrice}>{selectedProduct.price} PLN</p>
                        </div>
                        <div className={styles.productDetails}>
                            <p>{selectedProduct.description}</p>
                            <p>SKU: {selectedProduct.sku}</p>
                        </div>
                    </div>
                    <div className={styles.purchaseSection}>
                        <div>
                            Color selector
                        </div>
                        <div>
                            Size Selector
                        </div>
                        <div>
                            Quantity selector
                        </div>
                        <button className={styles.addToCartButton}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default ProductPage;