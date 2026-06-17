import { useState } from "react";
import type { CreateProductData, ProductCategory, ProductColor, ProductSize } from "../../../types/product";
import styles from "./ProductForm.module.scss";

type ProductFormValues = {
    sku: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    category: ProductCategory;
    mainImage: string;
    imageUrl: string;
    color: ProductColor;
    size: ProductSize;
    stock: string;
};

type ProductFormProps = {
    title: string;
    subtitle: string;
    submitLabel: string;
    loadingLabel: string;
    isLoading: boolean;
    error: string;
    initialValues?: ProductFormValues;
    onSubmit: (data: CreateProductData) => Promise<void>;
    onCancel: () => void;
};

const defaultValues: ProductFormValues = {
    sku: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "TSHIRT",
    mainImage: "",
    imageUrl: "",
    color: "BLACK",
    size: "M",
    stock: "",
};

function ProductForm({
    title,
    subtitle,
    submitLabel,
    loadingLabel,
    isLoading,
    error,
    initialValues = defaultValues,
    onSubmit,
    onCancel,
}: ProductFormProps) {
    const [sku, setSku] = useState(initialValues.sku);
    const [name, setName] = useState(initialValues.name);
    const [slug, setSlug] = useState(initialValues.slug);
    const [description, setDescription] = useState(initialValues.description);
    const [price, setPrice] = useState(initialValues.price);
    const [category, setCategory] = useState<ProductCategory>(initialValues.category);
    const [mainImage, setMainImage] = useState(initialValues.mainImage);
    const [imageUrl, setImageUrl] = useState(initialValues.imageUrl);
    const [color, setColor] = useState<ProductColor>(initialValues.color);
    const [size, setSize] = useState<ProductSize>(initialValues.size);
    const [stock, setStock] = useState(initialValues.stock);

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        await onSubmit({
            sku,
            name,
            slug,
            description,
            price: Number(price),
            category,
            mainImage,
            images: [
                {
                    url: imageUrl,
                    alt: name,
                    order: 1,
                },
            ],
            variants: [
                {
                    color,
                    size,
                    stock: Number(stock),
                },
            ],
        });
    }

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="sku">SKU</label>
                        <input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="slug">Slug</label>
                        <input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price">Price</label>
                        <input id="price" type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)}>
                            <option value="TSHIRT">T-shirt</option>
                            <option value="HOODIE">Hoodie</option>
                            <option value="LONGSLEEVE">Longsleeve</option>
                            <option value="CAP">Cap</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="mainImage">Main image</label>
                        <input id="mainImage" value={mainImage} onChange={(e) => setMainImage(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="color">Color</label>
                        <select id="color" value={color} onChange={(e) => setColor(e.target.value as ProductColor)}>
                            <option value="BLACK">Black</option>
                            <option value="WHITE">White</option>
                            <option value="GREY">Grey</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="size">Size</label>
                        <select id="size" value={size} onChange={(e) => setSize(e.target.value as ProductSize)}>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="stock">Stock</label>
                        <input id="stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className={styles.actions}>
                    <button type="button" className={styles.secondaryButton} onClick={onCancel}>
                        Cancel
                    </button>

                    <button type="submit" className={styles.primaryButton} disabled={isLoading}>
                        {isLoading ? loadingLabel : submitLabel}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ProductForm;