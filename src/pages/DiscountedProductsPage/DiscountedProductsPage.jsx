import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import styles from "./DiscountedProductsPage.module.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductCard from "../../components/ProductCard/ProductCard";

function DiscountedProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching discounted products:", error);
      }
    };

    fetchProducts();
  }, []);

  const discountedProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.discont_price !== null && product.discont_price !== undefined,
    );
  }, [products]);

  return (
    <section className={styles.page}>
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Main page", path: "/" }, { label: "All sales" }]}
        />

        <h1 className={styles.title}>Discounted items</h1>

        <div className={styles.grid}>
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DiscountedProductsPage;
