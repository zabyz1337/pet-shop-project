import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import styles from "./DiscountedProductsPage.module.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductCard from "../../components/ProductCard/ProductCard";

function DiscountedProductsPage() {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/all");
        setProducts(response.data);
      } catch {}
    };

    fetchProducts();
  }, []);

  const discountedProducts = useMemo(() => {
    let result = products.filter(
      (product) =>
        product.discont_price !== null && product.discont_price !== undefined,
    );

    if (sortType === "price-low-high") {
      result.sort((a, b) => a.discont_price - b.discont_price);
    }

    if (sortType === "price-high-low") {
      result.sort((a, b) => b.discont_price - a.discont_price);
    }

    if (sortType === "newest") {
      result.sort((a, b) => {
        const aValue = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
        const bValue = b.createdAt ? new Date(b.createdAt).getTime() : b.id;

        return bValue - aValue;
      });
    }

    return result;
  }, [products, sortType]);

  return (
    <section className={styles.page}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Main page", path: "/" },
            { label: "Discounted items" },
          ]}
        />

        <h1 className={styles.title}>Discounted items</h1>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Sorted</span>

            <select
              className={styles.select}
              value={sortType}
              onChange={(event) => setSortType(event.target.value)}
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-high-low">price: high-low</option>
              <option value="price-low-high">price: low-high</option>
            </select>
          </div>
        </div>

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
