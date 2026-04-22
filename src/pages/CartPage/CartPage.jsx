import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "../../app/slices/cartSlice";
import styles from "./CartPage.module.css";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price =
      item.discont_price !== null && item.discont_price !== undefined
        ? item.discont_price
        : item.price;

    return sum + price * item.count;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <section className={styles.page}>
        <div className="container">
          <div className={styles.topRow}>
            <h1 className={styles.title}>Shopping cart</h1>
            <Link to="/" className={styles.backLink}>
              Back to the store
            </Link>
          </div>

          <div className={styles.emptyBox}>
            <p className={styles.emptyText}>
              Looks like you have no items in your basket currently.
            </p>
            <Link to="/products" className={styles.continueButton}>
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.topRow}>
          <h1 className={styles.title}>Shopping cart</h1>
          <Link to="/" className={styles.backLink}>
            Back to the store
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map((item) => {
              const hasDiscount =
                item.discont_price !== null && item.discont_price !== undefined;

              const currentPrice = hasDiscount
                ? item.discont_price
                : item.price;
              const itemTotal = currentPrice * item.count;

              return (
                <article key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={`http://localhost:3333/${item.image}`}
                      alt={item.title}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.info}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.name}>{item.title}</h2>

                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        ×
                      </button>
                    </div>

                    <div className={styles.bottomRow}>
                      <div className={styles.counter}>
                        <button
                          type="button"
                          className={styles.counterButton}
                          onClick={() => dispatch(decrementItem(item.id))}
                        >
                          -
                        </button>

                        <span className={styles.count}>{item.count}</span>

                        <button
                          type="button"
                          className={styles.counterButton}
                          onClick={() => dispatch(incrementItem(item.id))}
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.prices}>
                        <span className={styles.currentPrice}>
                          ${itemTotal.toFixed(2)}
                        </span>

                        {hasDiscount && (
                          <span className={styles.oldPrice}>
                            ${(item.price * item.count).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order details</h2>

            <div className={styles.summaryRow}>
              <span>{totalCount} items</span>
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button type="button" className={styles.orderButton}>
              Order
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
