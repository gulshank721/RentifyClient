import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Login.",
        description: "Successfully Logged in.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
    navigate("/");
  };

  return (
    <Box
      mx={"auto"}
      borderRadius={"10px"}
      w={"400px"}
      mt={10}
      p={4}
      shadow={"xl"}
    >
      <Text
        fontSize={"m"}
        fontWeight={400}
        color={"darkgoldenrod"}
        textAlign={"center"}
      >
        Login or SignUp
      </Text>
      <Divider my={2} w={"full"} />
      <Text
        mx={"auto"}
        fontWeight={"600"}
        textAlign={"start"}
        fontSize={"2xl"}
        fontFamily={"sans-serif"}
      >
        Welcome to Rentify
      </Text>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <FormControl my={2}>
            <FormLabel color={"steelblue"}>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </FormControl>
          <FormControl my={2}>
            <FormLabel color={"steelblue"}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </FormControl>
          <Text textAlign={"end"}>
            Don't have an account?
            <Link to={"/register"} >
              <Text color={"blue"}>Sign up</Text>{" "}
            </Link>
          </Text>
          <Button isLoading={loading} colorScheme="blue" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginPage;
