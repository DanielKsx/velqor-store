import styles from './CartPage.module.scss'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Container from "../components/container/Container";
import { removeFromCart } from "../store/slices/cartSlice";
import { Link } from 'react-router-dom';

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
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${item.mainImage}`} alt={item.name} className={styles.itemImage}/>
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h2 className={styles.itemName}>{item.name}</h2>
                                        <p>{Number(item.price).toFixed(2)} PLN</p>
                                        <p className={styles.itemMeta}>Color: {item.color}</p>
                                        <p className={styles.itemMeta}>Size: {item.size}</p>
                                        <p className={styles.itemMeta}>Quantity: {item.quantity}</p>
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