import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductsThunk } from "../store/slices/productsSlice";

export function useProducts(){
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.items);
    const isLoading = useAppSelector((state) => state.products.isLoading);
    const error = useAppSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(fetchProductsThunk());
    }, [dispatch]);

    return {
        products,
        isLoading,
        error,
    };
}