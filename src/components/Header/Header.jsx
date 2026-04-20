import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <Link to="/" className={styles.logo}>
            PetShop
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              All products
            </NavLink>
            <NavLink
              to="/sales"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              All sales
            </NavLink>
          </nav>

          <Link to="/cart" className={styles.cart}>
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
