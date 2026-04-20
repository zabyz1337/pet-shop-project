import styles from "./HomePage.module.css";
import DiscountBanner from "../../components/DiscountBanner/DiscountBanner";

function HomePage() {
  return (
    <>
      <section className={styles.home}>
        <div className="container">
          <div className={styles.hero}>
            <h1 className={styles.title}>
              Amazing Discounts on Pets Products!
            </h1>
            <button className={styles.button}>Check out</button>
          </div>
        </div>
      </section>

      <DiscountBanner />
    </>
  );
}

export default HomePage;
