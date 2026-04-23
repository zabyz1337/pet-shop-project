import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./HomeSale.module.css";
import ProductCard from "../ProductCard/ProductCard";

function HomeSale() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      }
    };

    fetchProducts();
  }, []);

  const saleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.discont_price !== null && product.discont_price !== undefined,
    );

    const shuffled = [...filtered];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 4);
  }, [products]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <h2 className={styles.title}>Sale</h2>

          <Link to="/sales" className={styles.link}>
            All sales
          </Link>
        </div>

        <div className={styles.grid}>
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeSale;
