import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>
        <div>&copy; Copyright {new Date().getFullYear()} by Victoria Svirin. {" "}</div>
        <div>Design and guidance by Jonas Schmedtmann</div>
      </p>
    </div>
  );
}

export default Footer;
