import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { fetchProductBySlugAndSkuThunk } from "../store/slices/productsSlice";
import Container from "../components/container/Container";
import styles from './ProductPage.module.scss'
import type { ProductSize } from "../types/product";
import { addToCart } from "../store/slices/cartSlice";

function ProductPage() {
    const { slug, sku } = useParams();
    const dispatch = useAppDispatch();
    const { selectedProduct, isLoading, error } = useAppSelector((state) => state.products);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [cartError, setCartError] = useState<string | null>(null);

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

    const availableColors = [
        ...new Set(selectedProduct.variants.map((variant) => variant.color)),
    ];

    const availableSizes = selectedColor ? selectedProduct.variants
        .filter((variant) => variant.color === selectedColor)
        .map((variant) => variant.size)
        : [];

    const handleAddToCart = () => {
        if (!selectedColor) {
            setCartError('Choose color first');
            return;
        }

        if (!selectedSize) {
            setCartError('Choose size first');
            return;
        }
        setCartError(null);
        dispatch(addToCart({
            productId: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            mainImage: selectedProduct.mainImage,
            color: selectedColor,
            size: selectedSize,
            quantity,
            note: '',
        }));
    };

    return (
        <Container>
            <section className={styles.productPage}>
                <div className={styles.imageSection}>
                    <div className={styles.mainImage}>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}${selectedProduct.mainImage}`} alt={selectedProduct.name} className={styles.image}/>
                    </div>
                </div>
                <div className={styles.detailsSection}>
                    <div className={styles.productInfo}>
                        <div className={styles.productHeader}>
                            <h1 className={styles.productTitle}>{selectedProduct.name}</h1>
                            <p className={styles.productPrice}>{Number(selectedProduct.price).toFixed(2)} PLN</p>
                        </div>
                        <div className={styles.productDetails}>
                            <p>{selectedProduct.description}</p>
                            <p>SKU: {selectedProduct.sku}</p>
                        </div>
                    </div>
                    <div className={styles.purchaseSection}>
                        <div className={styles.optionGroup}>
                            <p className={styles.optionLabel}>Color</p>
                            <div className={styles.colorSelector}>
                                {availableColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={`${styles.optionButton} ${selectedColor === color ? styles.optionButtonActive : ''}`}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setSelectedSize(null);
                                        }}> {color} </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.optionGroup}>
                            <p className={styles.optionLabel}>Size</p>
                            <div className={styles.sizeSelector}>
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        className={`${styles.optionButton} ${selectedSize === size ? styles.optionButtonActive : ''}`}
                                        onClick={() => setSelectedSize(size)}> {size} </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.quantity}>
                            <label htmlFor="quantity">Quantity</label>
                            <div className={styles.quantityControl}>

                                <button type="button" className={styles.quantityButton} onClick={() => {
                                    if (quantity <= 1) {
                                        return;
                                    }
                                    setQuantity(quantity - 1);
                                }}>-</button>

                                <span className={styles.quantityValue}>{quantity}</span>

                                <button type="button" className={styles.quantityButton} onClick={() => {
                                    if (quantity >= 30) {
                                        return;
                                    }
                                    setQuantity(quantity + 1);
                                }}>+</button>

                            </div>
                        </div>
                        <button type="button" className={styles.addToCartButton} onClick={handleAddToCart}>
                            Add to cart
                        </button>
                        {cartError && (
                            <p className={styles.cartError}>{cartError}</p>
                        )}
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default ProductPage;