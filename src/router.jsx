import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import {
  homeLoader,
  productsLoader,
  productDetailLoader,
  ordersLoader,
  cartLoader,
} from './loaders';
import Layout from './layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: '/products',
        element: <ProductsPage />,
        loader: productsLoader,
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />,
        loader: productDetailLoader,
      },
      {
        path: '/cart',
        element: <CartPage />,
        loader: cartLoader,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
        loader: ordersLoader,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
]);
