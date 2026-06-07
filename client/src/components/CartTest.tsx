import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";

function CartTest() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);

    function handleAddTestProduct() {
        dispatch(addToCart({
            productId: 'test-product-id',
            color: 'BLACK',
            size: 'M',
            quantity: 1,
            note: '',
        }));
    }

    return (
        <div>
            <p> Items in cart: {cart.length} </p>
            <button onClick={handleAddTestProduct}>
                Add test product
            </button>
        </div>
    )

}

export default CartTest;