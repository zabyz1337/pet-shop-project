import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs({ items }) {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <span key={index} className={styles.current}>
              {item.label}
            </span>
          );
        }

        return (
          <div key={index} className={styles.item}>
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
            <span className={styles.separator}>/</span>
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
