import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { SellerDetailsModal } from "./SellerDetailsModal";

export const PropertyCard = ({ id, property }) => {
  const [selectedProperty, setSelectedProperty] = useState();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const handlePropertyClick = () => {};

  function getFormatedPrice(price) {
    const formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
    console.log(formattedPrice);
    return formattedPrice;
  }

  function AirbnbCard({ propertyDetails }) {
    const property = {
      imageUrl: propertyDetails?.imageUrl || "https://bit.ly/2Z4KKcF",
      imageAlt: propertyDetails?.imageUrl || "Property Image",
      place: propertyDetails.place,
      area: propertyDetails.area,
      beds: propertyDetails.bedrooms,
      baths: propertyDetails.bathrooms,
      title: propertyDetails.title,
      formattedPrice: getFormatedPrice(propertyDetails.price) || "$1,900.00",
      reviewCount: 34,
      rating: 4,
    };

    return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={property.imageUrl} alt={property.imageAlt} />

        <Box p="6">
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {property.beds} beds &bull; {property.baths} baths
              </Box>
            </Box>
            {/* star rating */}
            <Box display="flex" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < property.rating ? "teal" : "gray"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {property.reviewCount} reviews
              </Box>
            </Box>
          </Box>

          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.title}
            </Box>
            <Text color="gray.600" fontSize="sm">
              {property.place}
            </Text>
          </Flex>

          <Box fontWeight={400} as="h5" color={'dark'}>
            {property.formattedPrice}
            {/* <Box as='span' color='gray.600' fontSize='sm'>
              / wk
            </Box> */}
          </Box>
          {/* 
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FaStar key={i} color={i < property.rating ? "teal" : "gray"} />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box> */}
        </Box>
      </Box>
    );
  }
  return (
    <div>
      <AirbnbCard propertyDetails={property} />
      
      {/* {
        selectedProperty && isDetailsOpen && 
        <SellerDetailsModal isOpen={isOpen} onClose= {()=>setIsDetailsOpen(false)} property={selectedProperty}/> 
      } */}
    </div>
  );
};
