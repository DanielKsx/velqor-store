import type { Product } from "../../types/product";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps){
    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.mainImage} alt={product.name} />
            <p>{product.price}</p>
        </div>
    );
}

export default ProductCard;