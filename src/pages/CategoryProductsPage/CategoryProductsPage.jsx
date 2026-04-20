import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./CategoryProductsPage.module.css";

function CategoryProductsPage() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${id}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (!categoryData) {
    return (
      <section className={styles.page}>
        <div className="container">
          <p className={styles.loading}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumb}>
            Main page
          </Link>
          <span className={styles.separator}>/</span>
          <Link to="/categories" className={styles.crumb}>
            Categories
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{categoryData.category.title}</span>
        </div>

        <h1 className={styles.title}>{categoryData.category.title}</h1>

        <div className={styles.grid}>
          {categoryData.data.map((product) => {
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

export default CategoryProductsPage;
