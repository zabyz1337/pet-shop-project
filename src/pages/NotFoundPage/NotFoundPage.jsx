import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import dogImg from "../../assets/images/404-dog.png";

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.visual}>
            <span className={styles.four}>4</span>
            <img src={dogImg} alt="Dog" className={styles.dog} />
            <span className={styles.four}>4</span>
          </div>

          <h1 className={styles.title}>Page Not Found</h1>

          <p className={styles.text}>
            We are sorry, the page you requested could not be found.
          </p>

          <Link to="/" className={styles.button}>
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
