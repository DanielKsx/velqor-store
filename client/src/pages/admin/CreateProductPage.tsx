import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/adminProductsApi";
import type { CreateProductData } from "../../types/product";
import ProductForm from "../../components/admin/product-form/ProductForm";

function CreateProductPage() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(data: CreateProductData) {
        try {
            setIsLoading(true);
            setError("");

            await createProduct(data);

            navigate("/admin/products");
        } catch {
            setError("Failed to create product");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ProductForm
            title="Create Product"
            subtitle="Add a new product to the store."
            submitLabel="Create product"
            loadingLabel="Creating..."
            isLoading={isLoading}
            error={error}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/admin/products")}
        />
    );
}

export default CreateProductPage;