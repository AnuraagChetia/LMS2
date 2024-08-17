import { HamburgerIcon, Icon } from "@chakra-ui/icons";
import {
  Button,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { IoMdSettings } from "react-icons/io";

const AdminSideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Button ref={btnRef} bg={"none"} onClick={onOpen} mt="2">
        <Icon as={HamburgerIcon} boxSize={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent pt="4">
          <Link
            p="2"
            w="100%"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin");
              onClose();
            }}
          >
            Dashboard
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/job-board");
              onClose();
            }}
          >
            Job board
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/courses");
              onClose();
            }}
          >
            Courses
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/users");
              onClose();
            }}
          >
            Users
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/coupons");
              onClose();
            }}
          >
            Coupons
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/orders");
              onClose();
            }}
          >
            Orders
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/messages");
              onClose();
            }}
          >
            Messages
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/admin/affiliates");
              onClose();
            }}
          >
            Affiliates
          </Link>
          <Link
            textAlign="center"
            p="2"
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
          </Link>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminSideDrawer;
