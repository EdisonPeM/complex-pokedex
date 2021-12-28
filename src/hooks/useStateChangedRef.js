import { useEffect, useLayoutEffect, useRef } from "react";
import useFirstRenderRef from "./useFirstRenderRef";

function useStateChangedRef(...states) {
  const statedChangedRef = useRef(false);
  const firstRenderRef = useFirstRenderRef();

  useLayoutEffect(() => {
    if (firstRenderRef.current) return;
    statedChangedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...states]);

  useEffect(() => {
    setTimeout(() => {
      statedChangedRef.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...states]);

  return statedChangedRef;
}

export default useStateChangedRef;
