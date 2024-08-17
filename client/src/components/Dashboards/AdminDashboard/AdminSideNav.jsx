import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import logo from "../../../assets/Navbar/logo.jpeg";
import { MdSpaceDashboard } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import { ChatIcon } from "@chakra-ui/icons";
import { FaUsers } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";

const AdminSideNav = () => {
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
              navigate("/dashboard/admin");
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
              navigate("/dashboard/admin/job-board");
            }}
          >
            Job board
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            w="100%"
            leftIcon={<FaEye />}
            onClick={() => {
              navigate("/dashboard/admin/courses");
            }}
          >
            View all courses
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<FaUsers />}
            w="100%"
            onClick={() => {
              navigate("/dashboard/admin/users");
            }}
          >
            View all users
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<RiCoupon2Line />}
            w="100%"
            onClick={() => {
              navigate("/dashboard/admin/coupons");
            }}
          >
            Coupons
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<IoMdCart />}
            w="100%"
            onClick={() => {
              navigate("/dashboard/admin/orders");
            }}
          >
            Orders
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<ChatIcon />}
            w="100%"
            onClick={() => {
              navigate("/dashboard/admin/messages");
            }}
          >
            Messages
          </Button>
          <Button
            borderRadius="0"
            bg="white"
            leftIcon={<ChatIcon />}
            w="100%"
            onClick={() => {
              navigate("/dashboard/admin/affiliates");
            }}
          >
            Affiliates
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

export default AdminSideNav;
