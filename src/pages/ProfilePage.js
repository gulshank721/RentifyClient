import {
  Box,
  Button,
  Flex,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import OurAvatar from "../components/Avatar";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const getFullName = () => {
    return user?.firstName + " " + user?.lastName;
  };
  return (
    <Box h={"full"} bgColor={"gray.50"} p={4}>
      <Box
        bgColor={"white"}
        rounded={"md"}
        shadow={"md"}
        my={4}
        p={4}
        mx={"auto"}
        width={[
          "100%", // 0-30em
          "70%",
          "40%", // 30em-48em
        ]}
      >
        <Box my={2} display={"flex"} justifyContent={"center"}>
          <OurAvatar userName={getFullName()} />
        </Box>
        <Box my={6}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={3}
            align="stretch"
          >
            <Flex h="20px">
              <Text w={"50%"} fontWeight={500} color={"gray.800"}>
                Full Name
              </Text>
              <Text color={"gray.400"} fontWeight={400}>
                {getFullName()}
              </Text>
            </Flex>
            <Flex h="20px">
              <Text w={"50%"} fontWeight={500} color={"gray.800"}>
                Email
              </Text>
              <Text color={"gray.400"} fontWeight={400}>
                {user?.email}
              </Text>
            </Flex>
            <Flex h="20px">
              <Text w={"50%"} fontWeight={500} color={"gray.800"}>
                Phone No.
              </Text>
              <Text color={"gray.400"} fontWeight={400}>
                {user?.phone}
              </Text>
            </Flex>
          </VStack>
          <Box mt={8}>
            <Button colorScheme="blue">Edit</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
