// useProperties.js (Custom Hook for Data Fetching)
import {useCallback } from 'react';
import axios from 'axios';
import { usePropertyContext } from '../context/propertiesContext';

const useProperties = () => {
  const { setProperties, setLoading, setError } = usePropertyContext();
  // console.log("useProperties");

  const fetchProperties = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/properties${query ? `?searchArea=${query}` : ''}`;
      const response = await axios.get(url);
      setProperties(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },[]) 

  return { fetchProperties };
};

export default useProperties;
