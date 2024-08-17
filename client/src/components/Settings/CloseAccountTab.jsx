import {
  Button,
  Flex,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const CloseAccountTab = () => {
  const user = useSelector((state) => state.user);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const deleteAccountHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/delete-user`,
        { headers: { Authorization: user.token } }
      );
      if (data.success)
        window.location.href(`${import.meta.env.VITE_FRONTEND_URL}`);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <Flex flexDir="column" w="100%">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="1"
        py="3"
        borderBottom="1px solid gainsboro"
      >
        <Text fontWeight="700" fontSize="2xl">
          Close Account
        </Text>
        <Text>Close your account permanently.</Text>
      </Flex>
      <Flex p="6" flexDir="column" gap="2">
        <Text>
          <span style={{ color: "red", fontWeight: "bold" }}>Warning:</span> If
          you close your account, you will be unsubscribed from all your 4
          courses, and will lose access forever.
        </Text>
        <Button
          w="fit-content"
          colorScheme="blackAlpha"
          bgColor="black"
          color="white"
          onClick={onOpen}
        >
          Close account
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={deleteAccountHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Flex>
  );
};

export default CloseAccountTab;
