import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCities } from "../context/CityContext";

function CountryList() {
  const { cities, isLoding } = useCities();

  const countries = cities.map((city) => {
    return { country: city.country, emoji: city.emoji };
  });

  const uniqueCountries = [];

  countries.forEach((countryObj) => {
    const isAlreadyExist = uniqueCountries.find(
      (country) => country.country === countryObj.country,
    );
    if (!isAlreadyExist) {
      uniqueCountries.push(countryObj);
    }
  });

  if (isLoding) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on a Map!" />;

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
