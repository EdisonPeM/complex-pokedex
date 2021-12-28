import { useLayoutEffect, useRef } from "react";

function useIsMountedRef() {
  const isMountedRef = useRef(true);
  useLayoutEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}

export default useIsMountedRef;
