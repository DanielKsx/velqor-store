import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchProductBySlugAndSkuThunk } from "../store/slices/productsSlice";

function ProductPage() {
    const { slug, sku } = useParams();
    const dispatch = useAppDispatch();
    const { selectedProduct, isLoading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        if (!slug || !sku) {
            return;
        }

        dispatch(fetchProductBySlugAndSkuThunk({ slug, sku }));
    }, [dispatch, slug, sku]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!selectedProduct) {
        return <p>Product not found</p>;
    }

    return (
        <div>
            <h1>{selectedProduct.name}</h1>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price} PLN</p>
            <p>SKU: {selectedProduct.sku}</p>

        </div>
    )
}

export default ProductPage;