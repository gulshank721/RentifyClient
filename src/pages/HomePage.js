import React, { useState, useEffect } from "react";
import axios from "axios";
// import Property from "../components/Property";
import { PropertyCard } from "../components/PropertyCard";
import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import Loader from "../utilities/Loader";
import AirbnbCard from "../components/AirbnbCard";
import SearchBar from "../components/SearchBar";
import { usePropertyContext } from "../context/propertiesContext";

const HomePage = () => {
  // const [properties, setProperties] = useState([]);
  const { properties, loading, error, fetchProperties } = usePropertyContext();
  const Base_Url = process.env.REACT_APP_BASE_URL;
  // const Local_url = process.env.REACT_APP_LOCAL_URL;

  if (loading)
    return (
      <Center h={'full'}>
        <Loader />
      </Center>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <Box w={"full"} mx={4}>
      <Box p={2}>
        <Text color={"gray"} as={"b"} fontSize={"large"}>
          Available Properties
        </Text>
      </Box>

      <Box width={"60%"} mx={"auto"}>
        <SearchBar/>
      </Box>

      <Box p={4}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={2}
        >
          {properties.length > 0 ? (
            properties.map((property) => (
              <GridItem key={property._id}>
                {/* <PropertyCard id={property._id} property={property} /> */}
                <AirbnbCard id={property._id} property={property} />
              </GridItem>
            ))
          ) : (
            <p>No Properties found</p>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
