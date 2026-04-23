import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import styles from "./AllProductsPage.module.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductCard from "../../components/ProductCard/ProductCard";

function AllProductsPage() {
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

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortType === "price-asc") {
      result.sort((a, b) => {
        const aPrice =
          a.discont_price !== null && a.discont_price !== undefined
            ? a.discont_price
            : a.price;
        const bPrice =
          b.discont_price !== null && b.discont_price !== undefined
            ? b.discont_price
            : b.price;

        return aPrice - bPrice;
      });
    }

    if (sortType === "price-desc") {
      result.sort((a, b) => {
        const aPrice =
          a.discont_price !== null && a.discont_price !== undefined
            ? a.discont_price
            : a.price;
        const bPrice =
          b.discont_price !== null && b.discont_price !== undefined
            ? b.discont_price
            : b.price;

        return bPrice - aPrice;
      });
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
          items={[{ label: "Main page", path: "/" }, { label: "All products" }]}
        />

        <h1 className={styles.title}>All products</h1>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Sorted</span>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className={styles.select}
            >
              <option value="default">by default</option>
              <option value="price-asc">price: low to high</option>
              <option value="price-desc">price: high to low</option>
              <option value="newest">newest</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllProductsPage;
