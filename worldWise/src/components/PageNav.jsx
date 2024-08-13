import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../components/Logo";

// This is a reusable component that can be included into every single page
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/* <li>
          <NavLink to="/"> Home</NavLink>
        </li> */}
        <li className={styles.navText}>
          <NavLink to="/pricing"> Pricing</NavLink>
        </li>
        <li className={styles.navText}>
          <NavLink to="/product"> Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink.navText}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
