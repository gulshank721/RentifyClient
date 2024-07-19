import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useProperties from "../api/useProperties";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const {fetchProperties} = useProperties();
  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
        loading,
        setLoading,
        error,
        setError,
        
        searchValue,
        setSearchvalue,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error(
      "usePropertyContext must be used within a PropertyProvider"
    );
  }
  return context;
};

export { PropertyProvider, usePropertyContext };
