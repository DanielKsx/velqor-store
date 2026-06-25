import { Link, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { useAppDispatch } from "../store/hooks";
import { clearAdmin } from "../store/slices/authSlice";

function AdminLayout() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    async function handleLogout(){
        try {
            await logout();
            dispatch(clearAdmin());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <Link to="/admin/products" className={styles.logo}> VELQOR Admin</Link>
                <nav className={styles.nav}>
                    <Link to="/admin/products" className={styles.navLink}> Products </Link>
                    <Link to="/admin/orders" className={styles.navLink}> Orders</Link>
                    <Link to="/" className={styles.navLink}> Storefront </Link>
                </nav>
            </aside>
            <div className={styles.page}>
                <header className={styles.header}>
                    <span>Admin panel</span>
                    <button type="button" className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </header>
                <main className={styles.main}>
                    <Outlet />
                </main>
                <footer className={styles.footer}>VELQOR Admin © 2026</footer>
            </div>
        </div>
    );
}

export default AdminLayout;