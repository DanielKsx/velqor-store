import Container from "../../components/container/Container";
import styles from "./LoginPage.module.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCurrentAdmin } from "../../api/authApi";
import { useAppDispatch } from "../../store/hooks";
import { setAdmin } from "../../store/slices/authSlice";

function LoginPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");




    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setError("");

            await login({ email, password });
            const admin = await getCurrentAdmin();
            dispatch(setAdmin(admin));
            navigate("/admin/products");
        } catch {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Container>
            <section className={styles.login}>
                <div className={styles.card}>
                    <h1>Login</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}> Email </label>
                            <input id="email" type="email" className={styles.input} value={email} onChange={(event) => setEmail(event.target.value)} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}> Password </label>
                            <input id="password" type="password" className={styles.input} value={password} onChange={(event) => setPassword(event.target.value)} required />
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>
            </section>
        </Container>
    );
}

export default LoginPage;