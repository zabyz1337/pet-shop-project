import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./AllProductsPage.module.css";

function AllProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumb}>
            Main page
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>All products</span>
        </div>

        <h1 className={styles.title}>All products</h1>

        <div className={styles.grid}>
          {products.map((product) => {
            const hasDiscount =
              product.discont_price !== null &&
              product.discont_price !== undefined;

            const discountPercent = hasDiscount
              ? Math.round(
                  ((product.price - product.discont_price) / product.price) *
                    100,
                )
              : 0;

            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  {hasDiscount && (
                    <div className={styles.badge}>-{discountPercent}%</div>
                  )}

                  <img
                    src={`http://localhost:3333/${product.image}`}
                    alt={product.title}
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <p className={styles.name}>{product.title}</p>

                  <div className={styles.prices}>
                    {hasDiscount ? (
                      <>
                        <span className={styles.currentPrice}>
                          ${product.discont_price}
                        </span>
                        <span className={styles.oldPrice}>
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className={styles.currentPrice}>
                        ${product.price}
                      </span>
                    )}
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

export default AllProductsPage;
