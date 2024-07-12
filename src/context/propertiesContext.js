import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Base_Url = process.env.REACT_APP_BASE_URL;
  // Function to fetch properties based on search area
  const fetchProperties = useCallback( async (query) => {
    setLoading(true);
    setError(null);
    let url = Base_Url+ '/api/properties';
    if (query) {
      url += `?searchArea=${query}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []) 


  // useEffect(()=>{
  //   fetchProperties();
  // },[])

  return (
    <PropertyContext.Provider value={{ properties, loading, error, fetchProperties, setProperties }}>
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

