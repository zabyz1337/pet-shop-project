import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logoIcon from "../../assets/icons/logo.svg";
import cartEmpty from "../../assets/icons/basket=empty.svg";
import cartFull from "../../assets/icons/basket=full.svg";
import styles from "./Header.module.css";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <Link to="/" className={styles.logo}>
            <img src={logoIcon} alt="logo" className={styles.logoIcon} />
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Main Page
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
            <img
              src={totalCount > 0 ? cartFull : cartEmpty}
              alt="cart"
              className={styles.cartIcon}
            />
            <span className={styles.count}>{totalCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
