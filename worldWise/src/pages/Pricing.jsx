// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div className={styles.pricingBox}>
          <h2 className={styles.pricingTitel}>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p className={styles.pricingText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <div className={styles.pricingBox}>
          <img className={styles.pricingImg} src="img-2.jpg" alt="overview of a large city with skyscrapers" />
        </div>
      </section>
    </main>
  );
}
