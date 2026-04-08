// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from "./Message";
import { useCities } from "../context/CityContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// const flagemojiToPNG = (flag) => {
//   var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
//     .map((char) => String.fromCharCode(char - 127397).toLowerCase())
//     .join("");
//   return (
//     <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
//   );
// };

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  const { mapLat, mapLng } = useURLPosition();
  const { createCity, isLoading } = useCities();

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchCities() {
        try {
          setGeoCodingError("");

          if (!mapLat && !mapLng) return;

          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`,
            { signal },
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Please click somewhere else 😉",
            );

          if (data) setCityName(data.city);

          setCountryName(data.countryName);

          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.log(err);
          if (err.name === "AbortError") return;
          setGeoCodingError(err.message);
        }
      }
      fetchCities();
      () => {
        controller.abort();
      };
    },
    [mapLat, mapLng],
  );

  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
      id: Date.now(),
    };

    await createCity(newCity);
    navigate(`/app/cities`);
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd / MM / yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
