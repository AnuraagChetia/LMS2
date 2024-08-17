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
import { logout } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Button ref={btnRef} bg={"none"} onClick={onOpen}>
        <Icon as={HamburgerIcon} boxSize={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent pt="2">
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/teacher");
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
              navigate("/dashboard/teacher/create-course");
              onClose();
            }}
          >
            Create course
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/teacher/view-course/all");
              onClose();
            }}
          >
            View course
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              navigate("/dashboard/teacher/account-settings");
              onClose();
            }}
          >
            Account Settings
          </Link>
          <Link
            p="2"
            textAlign="center"
            _hover={{ bgColor: "gainsboro" }}
            onClick={() => {
              dispatch(logout());
              navigate("/user/login");
              onClose();
            }}
          >
            Logout
          </Link>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
