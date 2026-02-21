import { useState, useEffect } from "react";

export function useLocalStorage(initailState, key) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initailState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
