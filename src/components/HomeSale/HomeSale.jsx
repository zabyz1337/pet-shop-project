import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./HomeSale.module.css";

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
    return products
      .filter(
        (product) =>
          product.discont_price !== null && product.discont_price !== undefined,
      )
      .slice(0, 4);
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
          {saleProducts.map((product) => {
            const discountPercent = Math.round(
              ((product.price - product.discont_price) / product.price) * 100,
            );

            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <div className={styles.badge}>-{discountPercent}%</div>

                  <img
                    src={`http://localhost:3333${product.image}`}
                    alt={product.title}
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <p className={styles.name}>{product.title}</p>

                  <div className={styles.prices}>
                    <span className={styles.currentPrice}>
                      ${product.discont_price}
                    </span>
                    <span className={styles.oldPrice}>${product.price}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeSale;
