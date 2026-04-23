import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/slices/cartSlice";
import axiosInstance from "../../api/axiosInstance";
import styles from "./ProductPage.module.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className={styles.page}>
        <div className="container">
          <p className={styles.loading}>Loading...</p>
        </div>
      </section>
    );
  }

  const hasDiscount =
    product.discont_price !== null && product.discont_price !== undefined;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <section className={styles.page}>
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Main page", path: "/" }, { label: "All products" }]}
        />

        <h1 className={styles.title}>{product.title}</h1>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              src={`http://localhost:3333/${product.image}`}
              alt={product.title}
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.prices}>
              {hasDiscount ? (
                <>
                  <span className={styles.currentPrice}>
                    ${product.discont_price}
                  </span>
                  <span className={styles.oldPrice}>${product.price}</span>
                  <span className={styles.badge}>-{discountPercent}%</span>
                </>
              ) : (
                <span className={styles.currentPrice}>${product.price}</span>
              )}
            </div>

            <button className={styles.button} onClick={handleAddToCart}>
              Add to cart
            </button>

            <div className={styles.descriptionBlock}>
              <h2 className={styles.subtitle}>Description</h2>
              <p className={styles.description}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
