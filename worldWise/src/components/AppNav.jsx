import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.linkBox}>
        <li>
          <NavLink to="cities">cities </NavLink>
        </li>
        <li>
          <NavLink to="countries"> Countries</NavLink>
        </li>
      </ul>{" "}
    </nav>
  );
}

export default AppNav;
