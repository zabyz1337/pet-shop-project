import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage";
import CategoryProductsPage from "../pages/CategoryProductsPage/CategoryProductsPage";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";
import DiscountedProductsPage from "../pages/DiscountedProductsPage/DiscountedProductsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryProductsPage />} />
        <Route path="products" element={<AllProductsPage />} />
        <Route path="sales" element={<DiscountedProductsPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
