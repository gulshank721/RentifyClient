import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { FaStar } from "react-icons/fa6";
import AirbnbCard from "./AirbnbCard";
// import { SellerDetailsModal } from "./SellerDetailsModal";

export const PropertyCard = ({ id, property }) => {
  // const [selectedProperty, setSelectedProperty] = useState();
  // const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // const handlePropertyClick = () => {};
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
