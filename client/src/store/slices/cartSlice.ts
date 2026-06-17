import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    productId: string;
    name: string;
    price: string;
    mainImage: string;
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

type UpdateCartItemNotePayload = {
    productId: string;
    color: string;
    size: string;
    note: string;
};

const initialState: CartItem[] = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
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

        clearCart() {
            return [];
        },

        updateCartItemQuantity(
            state,
            action: PayloadAction<{
                productId: string;
                color: string;
                size: string;
                quantity: number;
            }>
        ) {
            const item = state.find((cartItem) => {
                return (
                    cartItem.productId === action.payload.productId &&
                    cartItem.color === action.payload.color &&
                    cartItem.size === action.payload.size
                );
            });

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        updateCartItemNote(state, action: PayloadAction<UpdateCartItemNotePayload>) {
            const item = state.find((cartItem) => {
                return (
                    cartItem.productId === action.payload.productId &&
                    cartItem.color === action.payload.color &&
                    cartItem.size === action.payload.size
                );
            });

            if (item) {
                item.note = action.payload.note;
            }
        },
    }


});

export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity, updateCartItemNote } = cartSlice.actions;


export default cartSlice.reducer;


