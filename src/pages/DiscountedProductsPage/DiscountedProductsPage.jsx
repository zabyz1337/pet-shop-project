import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./DiscountedProductsPage.module.css";

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
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumb}>
            Main page
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>All sales</span>
        </div>

        <h1 className={styles.title}>Discounted items</h1>

        <div className={styles.grid}>
          {discountedProducts.map((product) => {
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

export default DiscountedProductsPage;
