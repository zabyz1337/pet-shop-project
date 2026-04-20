import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero.png";
import styles from "./HomePage.module.css";
import HomeCategories from "../../components/HomeCategories/HomeCategories";
import DiscountBanner from "../../components/DiscountBanner/DiscountBanner";

function HomePage() {
  return (
    <>
      <section className={styles.home}>
        <div className="container">
          <div className={styles.hero}>
            <img
              src={heroImg}
              alt="Amazing discounts on pets products"
              className={styles.heroImage}
            />
            <Link to="/sales" className={styles.overlayButton} />
          </div>
        </div>
      </section>

      <HomeCategories />
      <DiscountBanner />
    </>
  );
}

export default HomePage;
