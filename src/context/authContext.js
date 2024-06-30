import React, { createContext, useState, useEffect }  from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const Base_Url = process.env.REACT_APP_BASE_URL ;
    // console.log(Base_Url);

    const login = async (email, password) => {

      const { data } = await axios.post(Base_Url+'/api/users/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    };
  
    const register = async (userData) => {
      const { data } = await axios.post(Base_Url+'/api/users/register', userData);
      console.log(data);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('userInfo');
    };
  
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        setUser(userInfo);
      }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
          {children}
        </AuthContext.Provider>
      );
}
