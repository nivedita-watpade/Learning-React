import { useEffect } from "react";

export function useKey(event, key, action) {
  useEffect(
    function () {
      function handleKeyEvents(e) {
        if (e.key === key) {
          action();
        }
      }
      window.addEventListener(event, handleKeyEvents);

      return () => {
        window.removeEventListener(event, handleKeyEvents);
      };
    },
    [action, key, event],
  );
}
