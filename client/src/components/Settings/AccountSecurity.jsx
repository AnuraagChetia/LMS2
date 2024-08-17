import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const AccountSecurity = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmPassword] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  const changePasswordHandler = async () => {
    try {
      if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmNewPassword === ""
      ) {
        toast({
          title: "Please enter all the fields!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      if (newPassword !== confirmNewPassword) {
        toast({
          title: "Passwords do not match!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/change-password-settings`,
        { currentPassword: currentPassword, newPassword: newPassword },
        { headers: { Authorization: user.token } }
      );

      if (data.success) {
        toast({
          title: "Password updateed!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const changeEmailHandler = async () => {
    try {
      if (!email)
        return toast({
          title: "New email not provided!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/change-email`,
        { newEmail: email, password: password },
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Email updateed!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex w="100%" flexDirection="column">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="1"
        py="3"
        borderBottom="1px solid gainsboro"
      >
        <Text fontWeight="700" fontSize="2xl">
          Account Security
        </Text>
        <Text textAlign='center'>Edit your account settings and change your password here.</Text>
      </Flex>
      <Flex
        px="4"
        py="6"
        w="100%"
        flexDir="column"
        borderBottom="1px solid gainsboro"
      >
        <Text>Email:</Text>
        <Flex w="100%" border="1px" p="2" justifyContent="space-betweens" s>
          <Text w="100%">Your email address is {user.email}</Text>
          <Icon as={EditIcon} boxSize="6" cursor="pointer" onClick={onOpen} />
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change your email</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDir="column" gap="4">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                borderRadius="0"
                outline="1px solid black"
              />
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                borderRadius="0"
                outline="1px solid black"
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blackAlpha"
                bgColor="black"
                onClick={changeEmailHandler}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex
        px="4"
        py="6"
        w="100%"
        flexDir="column"
        borderBottom="1px solid gainsboro"
        gap="3"
      >
        <Text>Password:</Text>
        <Input
          placeholder="Enter current password"
          outline="1px solid black"
          borderRadius="0"
          type="password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
          isRequired
        />
        <Input
          placeholder="Enter new password"
          outline="1px solid black"
          borderRadius="0"
          value={newPassword}
          type="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          required
        />
        <Input
          placeholder="Re-type password"
          outline="1px solid black"
          borderRadius="0"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
        />
        <Button
          w="fit-content"
          colorScheme="blackAlpha"
          bgColor="black"
          onClick={changePasswordHandler}
        >
          Change Password
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountSecurity;
