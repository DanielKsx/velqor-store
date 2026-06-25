import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminLayout from "../layouts/AdminLayout";
import CreateProductPage from "../pages/admin/CreateProductPage";
import EditProductPage from "../pages/admin/EditProductPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "../pages/admin/AdminOrdersDetailsPage";

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
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ],
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "products",
                element: <AdminProductsPage />,
            },
            {
                path: "orders",
                element: <AdminOrdersPage />
            },
            {
                path: "orders/:id",
                element: <AdminOrderDetailsPage />
            },
            {
                path: "products/new",
                element: <CreateProductPage />,
            },
            {
                path: "products/:id/edit",
                element: <EditProductPage />,
            },
            {
                index: true,
                element: <Navigate to="products" replace />
            }
        ],
    }
]);