import styles from "./Footer.module.css";
import instagramIcon from "../../assets/icons/ic-instagram.svg";
import whatsappIcon from "../../assets/icons/ic-whatsapp.svg";
import mapImg from "../../assets/images/map.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.label}>Phone</p>
            <a className={styles.value} href="tel:+493091588492">
              +49 30 915-88-492
            </a>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Socials</p>

            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="instagram" />
              </a>

              <a
                href="https://wa.me/493091588492"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <img src={whatsappIcon} alt="whatsapp" />
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Address</p>
            <p className={styles.value}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </div>

          <div className={styles.card}>
            <p className={styles.label}>Working hours</p>
            <p className={styles.value}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.map}>
          <img src={mapImg} alt="map" className={styles.mapImage} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
