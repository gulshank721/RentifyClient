import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await register({ firstName, lastName, email, phone, password, role });
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
          console.log("success called");
          navigate("/");
    } catch (error) {
        toast({
            title: error.message,
            description: "Sign Up Failed",
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
    }
    finally{
      setLoading(false)
    }
    
   
  };

  return (
    <Box
      mx={"auto"}
    //   border={"1px solid"}
      borderColor={"gray"}
      borderRadius={"10px"}
      w={"400px"}
      mt={2}
    >
      <Text
        mx={"auto"}
        textAlign={"center"}
        fontSize={"larger"}
        fontFamily={"cursive"}
      >
        Register
      </Text>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <FormControl my={1}>
            <FormLabel>FirstName</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </FormControl>
          <FormControl my={1}>
            <FormLabel>LastName</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </FormControl>
          <FormControl my={1}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </FormControl>
          <FormControl my={1}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              required
            />
          </FormControl>
          <FormControl my={1}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </FormControl>
          <FormControl my={1}>
            <FormLabel>Role</FormLabel>
            <Select placeholder="Select option" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="buyer">Buyer</option>c{" "}
              <option value="seller">Seller</option>
            </Select>
          </FormControl>
          
        <Button isLoading={loading} colorScheme="blue" type="submit">Register</Button>
        </Box>

        
      </form>
    </Box>
  );
};

export default RegisterPage;
