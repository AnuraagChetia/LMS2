import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import logo from "../../../assets/Navbar/logo.jpeg";
import { MdSpaceDashboard } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { logout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

const SideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box h="100vh">
      <Flex
        h="100vh"
        borderRight="1px solid gainsboro"
        flexDirection="column"
        overflowY="auto"
        bg="white"
        boxShadow="sm"
      >
        <Image src={logo} h="130" w="130" alt="logo" p="6" />
        <Flex direction="column" alignItems="start" w="100%">
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<MdSpaceDashboard />}
            onClick={() => {
              navigate("/dashboard/teacher");
            }}
            w="100%"
          >
            Dashboard
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            w="100%"
            leftIcon={<IoCreateOutline />}
            onClick={() => {
              navigate("/dashboard/teacher/create-course");
            }}
          >
            Create course
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            w="100%"
            leftIcon={<FaEye />}
            onClick={() => {
              navigate("/dashboard/teacher/view-course/all");
            }}
          >
            View course
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<IoMdSettings />}
            w="100%"
            onClick={() => {
              navigate("/dashboard/teacher/account-settings");
            }}
          >
            Account Settings
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<IoMdSettings />}
            w="100%"
            onClick={() => {
              dispatch(logout());
              navigate("/user/login");
            }}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SideNav;
