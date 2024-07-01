import React, { useState, useEffect } from "react";
import axios from "axios";
// import Property from "../components/Property";
import { PropertyCard } from "../components/PropertyCard";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Base_Url = process.env.REACT_APP_BASE_URL;
  // const Local_url = process.env.REACT_APP_LOCAL_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(Base_Url + "/api/properties");
        setProperties(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProperties();
  }, [Base_Url]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <Box w={"full"} mx={4}>
      <Box p={2}>
        <Text color={"gray"} as={"b"} fontSize={"large"}>
          Available Properties
        </Text>
      </Box>

      <Box p={4}>
        <Grid templateColumns={{base:"repeat(1, 1fr)", md: "repeat(2, 1fr)", lg:"repeat(3, 1fr)"}} gap={2}>
          {properties.length > 0 ? (
            properties.map((property) => (
              <GridItem key={property._id}>
                <PropertyCard id={property._id} property={property} />
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
