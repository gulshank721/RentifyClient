import React, { createContext, useState, useEffect }  from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { redirect } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const toast = useToast();
    const [user, setUser] = useState(null);
    const Base_Url = process.env.REACT_APP_BASE_URL ;
    // console.log(Base_Url);

    const login = async (email, password) => {

      const { data } = await axios.post(Base_Url+'/api/users/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    };
  
    const register = async (userData) => {
      try {
        const  res  = await axios.post(Base_Url+'/api/users/register', userData);
        console.log(res);
        if(res.status === 201){
          console.log(res.data);
          setUser(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
        } else {
          const error = new Error(res.data?.message);
          // error.description = res.data?.description;
          throw error;
          // throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        // throw error;
        throw new Error(error.response ? error.response.data.message : error.message);
      }
      
    };
  
    const logout = () => {
      try{
        setUser(null);
        localStorage.removeItem('userInfo');
        toast({
          title: 'Logged Out',
          description: "Successfuly Logged Out",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }catch{
        toast({
          title: 'Logging Out Failed',
          description: "",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }finally{
        redirect("/");
      }
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
