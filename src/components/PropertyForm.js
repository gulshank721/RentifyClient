import { Box, Button, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const PropertyForm = ({ property, onSave }) => {
  const [title, setTitle] = useState(property?.title || "");
  const [place, setPlace] = useState(property?.place || "");
  const [area, setArea] = useState( property?.area || "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(
     property?.bathrooms || ""
  );
  const [nearby, setNearby] = useState(property?.nearby || "");
  const [price, setPrice] = useState(property?.price || "");
  const [imageFile, setImageFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      title,
      place,
      area,
      bedrooms,
      bathrooms,
      nearby,
      price,
    };
    onSave(newProperty);
  };

  return (
    <Box w={'80%'} mx={'auto'}>
      <Text textAlign={'start'} color={'gray.400'}>Add New Property</Text>
      <form onSubmit={handleSubmit}>
        <Grid p={4} templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </GridItem>
          <GridItem>
            <Input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Place"
              required
            />
          </GridItem>
          <GridItem>
            <Input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (sq ft)"
              required
            /></GridItem>
            <GridItem>
            <Input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="Bedrooms"
              required
            />
          </GridItem>
          <GridItem>
            <Input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="Bathrooms"
              required
            />
          </GridItem>
          <GridItem>
            <Input
              type="text"
              value={nearby}
              onChange={(e) => setNearby(e.target.value)}
              placeholder="Nearby"
              required
            />
          </GridItem>
          <GridItem>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </GridItem>
          {/* <GridItem>
            <Input
              type="file"
              // value={price}
              onChange={(e) => setImageFile(e.target.files[0])}
              placeholder="Price"
              required
            />
          </GridItem> */}
          <GridItem>
          <Button type="submit">Save Property</Button>
          
          </GridItem>

          
        </Grid>
      </form>
    </Box>
  );
};

export default PropertyForm;
