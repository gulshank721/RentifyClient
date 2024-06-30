import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    GridItem,
    Input,
    Grid,
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { useContext, useState } from "react";
  import { AuthContext } from "../context/authContext";
  import { useToast } from "@chakra-ui/react";
  
  export const SellerDetailsModal = ({
    isOpen,
    onClose,
    property,
    
  }) => {
    const [title, setTitle] = useState(property?.title || "");
    const [place, setPlace] = useState(property?.place || "");
    const [area, setArea] = useState(property?.area || "");
    const [bedrooms, setBedrooms] = useState(property?.bedrooms || "");
    const [bathrooms, setBathrooms] = useState(property?.bathrooms || "");
    const [nearby, setNearby] = useState(property?.nearby || "");
    const [price, setPrice] = useState(property?.price || "");
    console.log(property, title);
    const Base_Url = process.env.REACT_APP_BASE_URL;
    const Local_url = process.env.REACT_APP_LOCAL_URL;
    
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
  
    const handleSubmit = async (e) => {
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
      try {
        setLoading(true);
        const { data } = await axios.put(
          Local_url + `/api/properties/${property._id}`,
          newProperty,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data);
  
        toast({
          title: "Update",
          description: data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
  
        //   setProperties([...properties, data]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Property</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Grid templateColumns="repeat(4, 1fr)" gap={2}>
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
                    />
                  </GridItem>
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
                  <GridItem>
                    <Button isLoading={loading} colorScheme="blue" type="submit">
                      Save Property
                    </Button>
                  </GridItem>
                </Grid>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  