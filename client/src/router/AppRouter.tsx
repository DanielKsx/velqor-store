import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'products/:slug/:sku',
                element: <ProductPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            }
        ],
    },
]);