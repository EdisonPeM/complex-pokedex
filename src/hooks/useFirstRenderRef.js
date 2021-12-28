import { useEffect, useRef } from "react";

function useFirstRenderRef() {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      firstRenderRef.current = false;
    });
  }, []);

  return firstRenderRef;
}

export default useFirstRenderRef;
