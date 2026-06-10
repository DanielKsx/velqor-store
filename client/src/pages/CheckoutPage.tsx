import Container from "../components/container/Container";
import styles from "./CheckoutPage.module.scss"
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

function CheckoutPage() {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const cartItems = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    if (cartItems.length === 0 && !isSuccess) {
    return (
        <Container>
            <section className={styles.emptyCheckout}>
                <h1>Your cart is empty</h1>
                <p>Add products to your cart before checkout.</p>
                <Link to="/" className={styles.continueShoppingButton}>Continue Shopping</Link>
            </section>
        </Container>
    );
}

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);
        setSubmitError(null);


        const payload = {
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            items: cartItems.map((item) => ({
                productId: item.productId,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                note: item.note,
            })),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Could not place order');
            }

            setIsSuccess(true);

            dispatch(clearCart());

            setCustomerName('');
            setCustomerEmail('');
            setCustomerPhone('');
            setCustomerAddress('');
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Container>
                <section className={styles.successPage}>
                    <h1 className={styles.successTitle}>Thank you for your order!</h1>
                    <p className={styles.successMessage}> Your order has been received and is being processed.</p>
                    <Link to="/" className={styles.continueShoppingButton}>Continue Shopping</Link>
                </section>
            </Container>
        );
    }

    return (
        <Container>
            <section className={styles.checkoutPage}>
                <h1 className={styles.checkoutTitle}>Checkout</h1>
                <form className={styles.checkoutForm} onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <label htmlFor="customerName" className={styles.label}>Name</label>
                        <input id="customerName" type="text" className={styles.input} value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="customerEmail" className={styles.label}>Email</label>
                        <input id="customerEmail" type="email" className={styles.input} value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="customerPhone" className={styles.label}>Phone</label>
                        <input id="customerPhone" type="text" className={styles.input} value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="customerAddress" className={styles.label}>Address</label>
                        <textarea id="customerAddress" className={styles.textarea} value={customerAddress} onChange={(event) => setCustomerAddress(event.target.value)} />
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Place order'}</button>
                    {submitError && <p>{submitError}</p>}
                </form>
            </section>
        </Container>
    );
}

export default CheckoutPage; 