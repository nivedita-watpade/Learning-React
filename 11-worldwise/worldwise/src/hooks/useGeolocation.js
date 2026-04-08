import { useState } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function getPosition() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      () => {
        const defaultCoordinates = { lat: 20.3633277, lng: 73.851463 };
        setPosition(defaultCoordinates);
        //   setError(error.message);
        setIsLoading(false);
      },

      {
        timeout: 2000,
      },
    );
  }

  return { position, isLoading, getPosition };
}
