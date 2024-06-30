import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import PropertyForm from "../components/PropertyForm";
import {
  Box,
  Button,
  Divider,
  Editable,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useStepContext,
} from "@chakra-ui/react";
import { PropertyFormModal } from "../components/PropertyFormModal";

const SellerDashboardPage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const Base_Url = process.env.REACT_APP_BASE_URL;
  const Local_url = process.env.REACT_APP_LOCAL_URL;

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get(
        Local_url + "/api/properties/myproperties",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProperties(data);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const handleSaveProperty = async (property) => {
    try {
      const { data } = await axios.post(
        Base_Url + "/api/properties",
        property,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProperties([...properties, data]);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  const handleUpdateProperty = async (id, updatedProperty) => {
    try {
      const { data } = await axios.put(
        Base_Url + `/api/properties/${id}`,
        updatedProperty,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProperties(properties.map((prop) => (prop._id === id ? data : prop)));
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(Base_Url + `/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProperties(properties.filter((prop) => prop._id !== id));
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <Box p={2} textAlign={"center"}>
      <Text as={"b"} fontSize={"larger"}>
        User Dashboard
      </Text>
      <Tabs my={2} size="md" isFitted  variant="enclosed">
        <TabList>
          <Tab>List new </Tab>
          <Tab>My Listings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PropertyForm
              property={selectedProperty}
              onSave={handleSaveProperty}
            />
          </TabPanel>
          <TabPanel>
            <Text fontSize={"large"} textColor={"gray"}>
              My Properties
            </Text>
            <Flex
              p={1}
              px={4}
              background={"#EDF2F7"}
              justifyContent={"space-between"}
            >
              <Text>Title</Text>
              <Text>Place</Text>
              <Text>Action</Text>
            </Flex>
            {properties.length > 0 ? (
              properties.map((property) => (
                <Flex
                  key={property._id}
                  p={2}
                  my={2}
                  border={"1px solid #A0AEC0"}
                  borderRadius={"md"}
                  justifyContent={"space-between"}
                  borderColor={
                    selectedProperty?._id === property._id ? "#234E52" : ""
                  }
                  onClick={() => handlePropertyClick(property)}
                  _hover={{ backgroundColor: "#F7FAFC", cursor: "pointer" }}
                >
                  <Text fontSize={"large"} as={"b"}>
                    {property.title}
                  </Text>
                  <Text>{property.place}</Text>
                  <Flex justifyContent={"end"} gap={2}>
                    <Button
                      isDisabled={selectedProperty?._id !== property._id}
                      colorScheme="blue"
                      size={"sm"}
                      variant={"outline"}
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <Button
                      isDisabled={selectedProperty?._id !== property._id}
                      colorScheme="red"
                      size={"sm"}
                      onClick={() => handleDeleteProperty(property._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>
              ))
            ) : (
              <>
                <Text>No Property Listed</Text>
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* {error && <div>Error: {error}</div>} */}

      {selectedProperty && Editable && (
        <PropertyFormModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          property={selectedProperty}
          fetchProperties={fetchProperties}
        />
      )}
    </Box>
  );
};

export default SellerDashboardPage;
