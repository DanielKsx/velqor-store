import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    productId: string;
    name: string;
    price: string;
    color: string;
    size: string;
    quantity: number;
    note: string;
};

type RemoveCartItemPayload = {
    productId: string;
    color: string;
    size: string;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as CartItem[],
    reducers: {

        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.find((item) => {
                return (
                    item.productId === action.payload.productId &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
                );
            });
            if (existingItem) {
                existingItem.quantity += action.payload.quantity
            } else {
                state.push(action.payload);
            }
        },

        removeFromCart(state, action: PayloadAction<RemoveCartItemPayload>) {
            return state.filter((item) => {
                return !(
                    item.productId === action.payload.productId &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
                );
            });
        },
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;


export default cartSlice.reducer;


