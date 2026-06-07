import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    productId: string;
    color: string;
    size: string;
    quantity: number;
    note: string;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as CartItem[],
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) { 
            state.push(action.payload);
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;