import styles from './Navbar.module.scss';
import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useAppSelector } from '../../store/hooks';



function Navbar() {
    const cartItems = useAppSelector((state) => state.cart);
    const totalItem = cartItems.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    return (
        <header className={styles.header}>
            <Container>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.logo}>  VELQOR </Link>
                    <div className={styles.actions}>
                        <Link to="/login" className={styles.iconLink}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                        <Link to="/cart" className={styles.cartLink}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>Cart</span>
                            <span>({totalItem})</span>
                        </Link>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Navbar;