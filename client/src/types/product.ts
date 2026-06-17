
export type UUID = string;
export type ProductColor = 'BLACK' | 'WHITE' | 'GREY';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type ProductCategory = 'HOODIE' | 'TSHIRT' | 'LONGSLEEVE' | 'CAP';


export type ProductImage = {
    id: UUID;
    productId: UUID;
    url: string;
    alt: string;
    order: number;
}

export type ProductVariant = {
    id: UUID;
    productId: UUID;
    color: ProductColor;
    size: ProductSize;
    stock: number;
}

export type Product = {
    id: UUID;
    sku: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    category: ProductCategory;
    mainImage: string;
    createdAt: string;
    updatedAt: string;
    images: ProductImage[];
    variants: ProductVariant[];
}

export type CreateProductData = {
    sku: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: ProductCategory;
    mainImage: string;
    images: {
        url: string;
        alt: string;
        order: number;
    }[];
    variants: {
        color: ProductColor;
        size: ProductSize;
        stock: number;
    }[];
};