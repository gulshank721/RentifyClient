import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../hooks/useDebounce";
import { usePropertyContext } from "../context/propertiesContext";
import useProperties from "../api/useProperties";
import { MdClear } from "react-icons/md";

const SearchBar = () => {
  // const {fetchProperties} = usePropertyContext();
  const { fetchProperties } = useProperties();
  const {searchValue: inputValue, setSearchvalue: setInputValue} = usePropertyContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    // console.log("rerendering");
    if (debouncedValue !== undefined) {
      fetchProperties(debouncedValue);
    }
  }, [debouncedValue, fetchProperties]);

  const Base_Url = process.env.REACT_APP_BASE_URL;
  // useEffect(()=>{

  //     const fetchProperties = async () => {
  //         setIsLoading(true);
  //         let url ="";
  //         if(debouncedValue){
  //           url = `${Base_Url}/api/properties?searchArea=${debouncedValue}`;
  //         }else{
  //           url = `${Base_Url}/api/properties`;
  //         }
  //         try {
  //           const { data } = await axios.get(url);
  //           console.log(data);
  //           setProperties(data);
  //         //   setLoading(false);
  //         } catch (error) {
  //         //   setError(error.message || "An error occurred");

  //         }finally{
  //           setIsLoading(false);
  //         }
  //       };
  //       fetchProperties(inputValue);

  // },[debouncedValue, Base_Url ])

  return (
    <InputGroup display={"flex"} alignItems={"center"}>
      <InputLeftElement
        mt={1}
        pointerEvents="none"
        color="gray.300"
        fontSize="1.2em"
      >
        <FiSearch size={22} />
      </InputLeftElement>
      <Input
        size="lg"
        value={inputValue}
        onChange={handleInputChange}
        rounded={"full"}
        placeholder="Search Area"
      />

      {inputValue && inputValue.length > 0 ? (
        //clear icon
        <InputRightElement
          _hover={{ bgColor: "blue.900" }}
          bgColor={"blue.700"}
          p={2}
          m={1}
          me={2}
          rounded={"full"}
        >
         
          <MdClear onClick={()=>setInputValue("")} size={20} color={"red"} />
          
        </InputRightElement>
      ) : (
        <InputRightElement
          _hover={{ bgColor: "blue.900" }}
          bgColor={"blue.700"}
          p={2}
          m={1}
          me={2}
          rounded={"full"}
        >
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <FiSearch size={20} color={"white"} />
          )}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default memo(SearchBar);
