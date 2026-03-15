import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product"> Product </NavLink>
        </li>
        <li>
          <Link to="/pricing"> Pricing </Link>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
