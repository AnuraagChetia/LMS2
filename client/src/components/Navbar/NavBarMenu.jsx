import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const NavBarMenu = () => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef();
  //teach on LMS button handler
  const teachOnLMSHandle = () => {
    dispatch(logout());
    toast({
      title: "You have been logged out",
      description: "Please create a new account as a teacher",
      position: "top-right",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    navigate("/user/signup");
  };
  return (
    <Menu isLazy>
      <MenuButton as={Button} mt="8.2" size="sm" px={0} py={0} rounded="full">
        <Avatar
          mb={{ base: "2", lg: "1" }}
          size="sm"
          src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${user.userName}/${
            user.userName
          }.jpeg`}
          name={`${user.firstName} ${user.lastName}`}
          color="white"
          bgColor="black"
        />
      </MenuButton>
      <MenuList zIndex={5} mt={3}>
        <MenuItem
          display="flex"
          gap="2"
          onClick={() => {
            navigate("/user/settings/profile");
          }}
        >
          <Avatar
            size="md"
            src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${
              user.userName
            }/${user.userName}.jpeg`}
            name={`${user.firstName} ${user.lastName}`}
            color="white"
            bgColor="black"
          />
          <Flex w="100%" flexDir="column">
            <Text fontWeight="600">{`${user.firstName} ${user.lastName}`}</Text>
            <Text fontSize="13" isTruncated w={40}>
              {user.email}
            </Text>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            navigate("/my-courses");
          }}
        >
          <Text fontWeight="500">My learning</Text>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Text fontWeight="500">My Cart</Text>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/my-courses");
          }}
        >
          <Text fontWeight="500">Wishlist</Text>
        </MenuItem>
        <MenuItem onClick={onOpen}>
          <Text fontWeight="500">Teach on LMS</Text>
        </MenuItem>

        {/* <MenuDivider />
                  <MenuItem>
                    <Text fontWeight="500">Notifications</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontWeight="500">Messages</Text>
                  </MenuItem> */}
        <MenuDivider />
        <MenuItem
          onClick={() => {
            navigate("/user/settings/account-security");
          }}
        >
          <Text fontWeight="500">Account Settings</Text>
        </MenuItem>
        {/* <MenuItem>
                    <Text fontWeight="500">Payment methods</Text>
                  </MenuItem> */}
        <MenuDivider />
        {/* <MenuItem>
                    <Text fontWeight="500">Help</Text>
                  </MenuItem> */}
        <MenuItem
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          <Text fontWeight="500">Log out</Text>
        </MenuItem>
      </MenuList>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure?
            </AlertDialogHeader>

            <AlertDialogBody>
              You will be logged out and navigated to the signup page where you
              will have to create a new account as a Teacher
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={teachOnLMSHandle} ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Menu>
  );
};

export default NavBarMenu;
