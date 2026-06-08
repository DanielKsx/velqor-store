import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import { fetchProducts, fetchProductBySlugAndSku } from "../../api/productsApi";

type ProductsState = {
    items: Product[];
    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
};

type FetchProductBySlugAndSkuArgs = {
    slug: string;
    sku: string;
};

const initialState: ProductsState = {
    items: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
};

export const fetchProductsThunk = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return fetchProducts();
    }
);

export const fetchProductBySlugAndSkuThunk = createAsyncThunk(
    'products/fetchProductBySlugAndSku',
    async ({ slug, sku }: FetchProductBySlugAndSkuArgs) => {
        return fetchProductBySlugAndSku(slug, sku);
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchProductsThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Failed to fetch products';
        });
        builder.addCase(fetchProductBySlugAndSkuThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.selectedProduct = null;
        });
        builder.addCase(fetchProductBySlugAndSkuThunk.fulfilled, (state, action) => {
            state.selectedProduct = action.payload
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchProductBySlugAndSkuThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Failed to  fetch product';
            state.selectedProduct = null;
        });

    },
});



export default productsSlice.reducer;