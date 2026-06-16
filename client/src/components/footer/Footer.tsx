import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <h3>VELQOR</h3>
                    <p>Premium Streetwear</p>
                    <span>Built with React, NestJS and Prisma</span>
                </div>
                <div className={styles.column}>
                    <h4>Navigation</h4>
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                </div>
                <div className={styles.column}>
                    <h4>Developer</h4>
                    <a href="https://github.com/DanielKsx" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://linkedin.com/in/daniel-kowalczyk-b85571382" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
            <div className={styles.bottom}>
                © 2026 VELQOR. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;