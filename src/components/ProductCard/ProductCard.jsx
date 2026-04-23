import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/slices/cartSlice";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const isInCart = useSelector((state) =>
    state.cart.items.some((item) => item.id === product.id),
  );

  const hasDiscount =
    product.discont_price !== null && product.discont_price !== undefined;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100,
      )
    : 0;

  const imageUrl = product.image?.startsWith("/")
    ? `http://localhost:3333${product.image}`
    : `http://localhost:3333/${product.image}`;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInCart) return;

    dispatch(addToCart(product));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${product.id}`} className={styles.imageLink}>
          {hasDiscount && (
            <div className={styles.badge}>-{discountPercent}%</div>
          )}

          <img src={imageUrl} alt={product.title} className={styles.image} />
        </Link>

        <button
          type="button"
          className={`${styles.addButton} ${isInCart ? styles.added : ""}`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added" : "Add to cart"}
        </button>
      </div>

      <Link to={`/products/${product.id}`} className={styles.link}>
        <div className={styles.content}>
          <p className={styles.name}>{product.title}</p>

          <div className={styles.prices}>
            {hasDiscount ? (
              <>
                <span className={styles.currentPrice}>
                  ${product.discont_price}
                </span>
                <span className={styles.oldPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
