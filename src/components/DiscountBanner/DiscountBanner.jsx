import petsImg from "../../assets/images/discount-pets.png";
import styles from "./DiscountBanner.module.css";

function DiscountBanner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className={styles.box}>
          <h2 className={styles.title}>5% off on the first order</h2>

          <div className={styles.wrapper}>
            <div className={styles.left}>
              <img src={petsImg} alt="pets" className={styles.petsImage} />
            </div>

            <div className={styles.right}>
              <form className={styles.form}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone number" />
                <input type="email" placeholder="Email" />
                <button type="submit">Get a discount</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscountBanner;
