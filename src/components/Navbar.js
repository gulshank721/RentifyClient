import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { CgProfile } from "react-icons/cg";
import { MdLogin, MdLogout, MdOutlineAccountCircle } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";

export const Navbar = () => {
  // const [selectedNav, setSelectedNav] = useState();
  const { user, logout } = useContext(AuthContext);

  const navList = [
    // { name: "Home", path: "/home" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <Box>
      <Flex
        color={"white"}
        alignItems={"center"}
        bgColor={"blue.800"}
        justifyContent={"space-between"}
        py={4}
        px={2}
      >
        <Box ms={2}>
          <Link to={"/"}>
            <Text fontFamily={"cursive"} fontSize={"2xl"} as={"b"}>
              Rentify
            </Text>
          </Link>
        </Box>

        <Flex mx={"auto"} gap={4} me={"10px"} justify={"center"}>
          <Box
            fontSize={"sm"}
            fontWeight={500}
            color={"white"}
            _hover={{
              // textDecoration: "underline",
              color: "cyan",
            }}
            p={2}
            ms={4}
          >
            <Link to={"/"}>Home</Link>
          </Box>
          {user && user.role === "seller" && (
            <Box
              fontSize={"sm"}
              fontWeight={500}
              // color={"white"}
              _hover={{
                // textDecoration: "underline",
                color: "cyan",
              }}
              p={2}
              ms={4}
            >
              <Link to={"/seller-dashboard"}>Dashboard</Link>
            </Box>
          )}
    
          <Box color={"Gray"}>
            <Menu>
              <MenuButton
                borderRadius="full"
                border={"none"}
                as={IconButton}
                _hover={{ color: 'cyan'}}
                color={'white'}
                aria-label="Options"
                icon={<Icon as={CgProfile} w={6} h={6} />}
                variant="outline"
              />
              <MenuList>
                <MenuGroup title="Account">
                  {user && (
                    <MenuItem icon={<MdOutlineAccountCircle size={20} />}>
                      {" "}
                      Profile
                    </MenuItem>
                  )}

                  {user ? (
                    <MenuItem onClick={logout} icon={<IoMdLogOut size={20} />}>
                      {" "}
                      Logout
                    </MenuItem>
                  ) : (
                    <Link to={"/login"}>
                      <MenuItem icon={<MdLogin size={20} />}> Log In</MenuItem>
                    </Link>
                  )}

                  {
                    !user && (
                      <Link to={"/register"}>
                        <MenuItem icon={<FaUserPlus size={20} />}>
                          {" "}
                          Sign Up
                        </MenuItem>
                      </Link>
                    )
                  }
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Outlet />
    </Box>
  );
};
