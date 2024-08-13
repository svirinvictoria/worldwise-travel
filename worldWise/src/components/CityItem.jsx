import { useCities } from "../contexts/useCities";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  // adding data to query string - > add it to the path where the user will go to when he clicks on a link
  // each city gets access to a position object (lat & lng of a city)
  //console.log(position); //{lat: 40.46635901755316, lng: -3.7133789062500004}

  function handleClick(e) {
    e.preventDefault(); // this prevents the button simultaniously going to the link to the city item page.
    deleteCity(id);
  }
  return (
    <li>
      {/*saving param into rout => 2. connecting every item to the path */}
      {/* //addind data to query string =>2. adding the position parameter to the id */}
      {/* <Link className={styles.cityItem} to={`${id}`}> */}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        // now the state is transferred to URL
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className="styles.name">{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;{" "}
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
