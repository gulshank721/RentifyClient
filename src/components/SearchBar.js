import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../hooks/useDebounce";
import { usePropertyContext } from "../context/propertiesContext";

const SearchBar = () => {
    const {setProperties} = usePropertyContext();
    const [inputValue, setInputValue] = useState();


    const handleInputChange =(e)=>{
        console.log(e.target.value);
        setInputValue(e.target.value);
    }

    const debouncedValue = useDebounce(inputValue, 500);

    const Base_Url  = process.env.REACT_APP_BASE_URL;
    useEffect(()=>{

        const fetchProperties = async () => {
            // setLoading(true);
            try {
              const { data } = await axios.get(`${Base_Url}/api/properties?searchArea=${debouncedValue}`);
              setProperties(data);
            //   setLoading(false);
            } catch (error) {
            //   setError(error.message || "An error occurred");
            //   setLoading(false);
            }
          };
          fetchProperties();


    },[debouncedValue, Base_Url])
  return (
    <InputGroup display={"flex"} alignItems={'center'}>
      <InputLeftElement mt={1} pointerEvents="none" color="gray.300" fontSize="1.2em">
        <FiSearch size={22} />
      </InputLeftElement>
      <Input size="lg" value={inputValue} onChange={handleInputChange} rounded={"full"} placeholder="Search Area" />
      <InputRightElement _hover={{bgColor:"blue.900"}}  bgColor={"blue.700"} p={2} m={1} me={2} rounded={"full"}>
        <FiSearch size={20} color={"white"} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
