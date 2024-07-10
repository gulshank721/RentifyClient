import React, { useEffect, useState } from "react";

const useDebounce = ( value, delay ) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      // Update debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      // Cleanup the timeout on component unmount or when value changes
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
};

export default useDebounce;
