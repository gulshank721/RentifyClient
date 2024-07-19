import React, { useState, useEffect } from "react";
import axios from "axios";
// import Property from "../components/Property";
import { PropertyCard } from "../components/PropertyCard";
import { Box, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import Loader from "../utilities/Loader";
import AirbnbCard from "../components/AirbnbCard";
import SearchBar from "../components/SearchBar";
import { usePropertyContext } from "../context/propertiesContext";
import useProperties from "../api/useProperties";

const HomePage = () => {
  // const [properties, setProperties] = useState([]);
  const { properties, loading, error } = usePropertyContext();
  const { fetchProperties } = useProperties();

  useEffect(() => {
    if (!properties || properties.length === 0) {
      fetchProperties();
    }
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <Box overflowY={"auto"} h={"100%"} w={"full"}>
      <Box w={"80%"} mx={"auto"}>
        <Box p={2}>
          <Text color={"gray"} as={"b"} fontSize={"large"}>
            Available Properties
          </Text>
        </Box>

        <Box width={"60%"} mx={"auto"}>
          <SearchBar />
        </Box>
        {loading ? (
          <Center h={"full"} mt={4}>
            <Loader />
          </Center>
        ) : (
          <Box p={4}>
            {properties.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={2}
              >
                {properties.map((property) => (
                  <GridItem key={property._id}>
                    {/* <PropertyCard id={property._id} property={property} /> */}
                    <AirbnbCard id={property._id} property={property} />
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Box
                textAlign={"center"}
                fontStyle={"oblique"}
                fontWeight={400}
                textColor={"gray.400"}
                fontSize={"xx-large"}
                w={"full"}
              >
                <p>No Properties found</p>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
