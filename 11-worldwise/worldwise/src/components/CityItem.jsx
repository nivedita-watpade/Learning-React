import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CityContext";

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

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === city.id ? styles["cityItem--active"] : ""
        }`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(city.emoji)}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>({formatDate(city.date)})</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
