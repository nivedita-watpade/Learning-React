/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const { mapLat, mapLng } = useURLPosition();

  const navigate = useNavigate();

  const {
    position: geoLocationPosition,
    isLoading: geoLocationLoading,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (
        !geoLocationPosition ||
        !geoLocationPosition.lat ||
        !geoLocationPosition.lng
      )
        return;
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      navigate(
        `form?lat=${geoLocationPosition.lat}&lng=${geoLocationPosition.lng}`,
      );
    },
    [geoLocationPosition],
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition.lat && !geoLocationPosition.lng && (
        <Button type="position" onClick={getPosition}>
          {geoLocationLoading ? "Loading..." : "Get your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
