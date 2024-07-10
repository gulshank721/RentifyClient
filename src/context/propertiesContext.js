import React, { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch properties based on search area
  const fetchProperties = async (searchArea) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/properties?searchArea=${searchArea}`);
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider value={{ properties, loading, error, fetchProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
const usePropertyContext = () => {
    const context = useContext(PropertyContext);
    if (!context) {
      throw new Error('usePropertyContext must be used within a PropertyProvider');
    }
    return context;
  };
  
export { PropertyProvider, usePropertyContext };

