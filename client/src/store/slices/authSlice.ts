import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Admin = {
    sub: string;
    email: string;
};

type AuthState = {
    admin: Admin | null;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    admin: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAdmin(state, action: PayloadAction<Admin>) {
            state.admin = action.payload;
            state.isAuthenticated = true;
        },

        clearAdmin(state) {
            state.admin = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;