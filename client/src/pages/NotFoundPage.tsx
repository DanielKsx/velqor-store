import { Link } from "react-router-dom";
import Container from "../components/container/Container";
import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
    return (
        <Container>
            <section className={styles.notFound}>
                <p className={styles.code}>404</p>
                <h1>Page not found</h1>
                <p className={styles.text}>
                    The page you are looking for does not exist.
                </p>

                <Link to="/" className={styles.link}>
                    Back to home
                </Link>
            </section>
        </Container>
    );
}

export default NotFoundPage;