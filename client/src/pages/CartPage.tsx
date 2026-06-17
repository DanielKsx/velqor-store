import styles from './CartPage.module.scss'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Container from "../components/container/Container";
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity, updateCartItemNote } from '../store/slices/cartSlice';

function CartPage() {
    const cartItems = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const totalPrice = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) * item.quantity)
    }, 0);
    return (
        <Container>
            <section className={styles.cartPage}>
                <h1 className={styles.cartTitle}>Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className={styles.cartList}>
                            {cartItems.map((item) => (
                                <div key={`${item.productId}-${item.color}-${item.size}`} className={styles.cartItem}>
                                    <div className={styles.imageWrapper}>
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${item.mainImage}`} alt={item.name} className={styles.itemImage} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h2 className={styles.itemName}>{item.name}</h2>
                                        <p>{Number(item.price).toFixed(2)} PLN</p>
                                        <p className={styles.itemMeta}>Color: {item.color}</p>
                                        <p className={styles.itemMeta}>Size: {item.size}</p>
                                        <div className={styles.quantityControl}>
                                            <span className={styles.quantityLabel}>Quantity:</span>
                                            <button type="button" className={styles.quantityButton} onClick={() => {
                                                if (item.quantity <= 1) return;
                                                dispatch(updateCartItemQuantity({
                                                    productId: item.productId,
                                                    color: item.color,
                                                    size: item.size,
                                                    quantity: item.quantity - 1,
                                                }));
                                            }}
                                            > - </button>
                                            <span className={styles.quantityValue}>{item.quantity}</span>
                                            <button type="button" className={styles.quantityButton} onClick={() => {
                                                dispatch(updateCartItemQuantity({
                                                    productId: item.productId,
                                                    color: item.color,
                                                    size: item.size,
                                                    quantity: item.quantity + 1,
                                                }));
                                            }}
                                            > + </button>
                                        </div>
                                        <div className={styles.noteGroup}>
                                            <label htmlFor={`note-${item.productId}-${item.color}-${item.size}`}> Note: </label>
                                            <textarea id={`note-${item.productId}-${item.color}-${item.size}`} value={item.note} maxLength={300}
                                                placeholder="Add a note for this product..."
                                                onChange={(event) => {
                                                    dispatch(updateCartItemNote({
                                                        productId: item.productId,
                                                        color: item.color,
                                                        size: item.size,
                                                        note: event.target.value,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.itemActions}>
                                        <button type="button" onClick={() => {
                                            dispatch(removeFromCart({
                                                productId: item.productId,
                                                color: item.color,
                                                size: item.size,
                                            }));
                                        }} className={styles.removeButton}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.summary}>
                            <h2>Total:</h2>
                            <p>{totalPrice.toFixed(2)} PLN</p>
                        </div>
                        <Link to="/checkout" className={styles.checkoutButton}>Go to checkout</Link>
                    </>
                )}


            </section>
        </Container>

    )
}

export default CartPage;