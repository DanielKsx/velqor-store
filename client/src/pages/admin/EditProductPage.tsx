import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/admin/product-form/ProductForm";
import { fetchAdminProductById, updateProduct, } from "../../api/adminProductsApi";
import type { CreateProductData, Product } from "../../types/product";

function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            if (!id) {
                return;
            }

            try {
                const data = await fetchAdminProductById(id);
                setProduct(data);
            } catch {
                setError("Failed to load product");
            } finally {
                setIsLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    async function handleSubmit(data: CreateProductData) {
        if (!id) {
            return;
        }

        try {
            setIsSaving(true);
            setError("");

            await updateProduct(id, data);

            navigate("/admin/products");
        } catch {
            setError("Failed to update product");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <ProductForm
            title="Edit Product"
            subtitle="Update product details."
            submitLabel="Save changes"
            loadingLabel="Saving..."
            isLoading={isSaving}
            error={error}
            initialValues={{
                sku: product.sku,
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
                category: product.category,
                mainImage: product.mainImage,
                imageUrl: product.images[0]?.url ?? "",
                color: product.variants[0]?.color ?? "BLACK",
                size: product.variants[0]?.size ?? "M",
                stock: String(product.variants[0]?.stock ?? 0),
            }}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/admin/products")}
        />
    );
}

export default EditProductPage;