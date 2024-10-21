import { useEffect, useState } from "react";

function useDebounce(val: string) {
  const [debouncedVal, setDebouncedVal] = useState(val);
  useEffect(() => {
    const timer = setTimeout(() => {
        console.log("value debounced")
      setDebouncedVal(val);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [val]);
  return debouncedVal;
}
export default useDebounce;
