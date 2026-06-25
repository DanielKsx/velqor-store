import { useEffect } from "react";
import { getCurrentAdmin } from "../../api/authApi";
import { useAppDispatch } from "../../store/hooks";
import { clearAdmin, setAdmin } from "../../store/slices/authSlice";

function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function checkAuth() {
            try {
                const admin = await getCurrentAdmin();
                dispatch(setAdmin(admin));
            } catch {
                dispatch(clearAdmin());
            }
        }

        checkAuth();
    }, [dispatch]);

    return null;
}

export default AuthInitializer;