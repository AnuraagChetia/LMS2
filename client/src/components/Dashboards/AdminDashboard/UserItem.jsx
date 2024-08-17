import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  chakra,
  Container,
  HStack,
  VStack,
  Text,
  Tag,
  Link,
  Image,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserItem = ({ user, reload }) => {
  const admin = useSelector((state) => state.user);
  const textColor = useColorModeValue("gray.500", "gray.200");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/delete/user/${user._id}`,
        { headers: { Authorization: admin.token } }
      );
      if (data.success) {
        toast({
          title: "User Deleted!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      } else {
        toast({
          title: "Something went wrong!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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

  const activateHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/activate/${user._id}`,
        {},
        { headers: { Authorization: admin.token } }
      );
      if (data.success) {
        toast({
          title: "User Account Activated!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      } else {
        toast({
          title: "Something went wrong!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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

  const suspendHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/suspend/${user._id}`,
        {},
        { headers: { Authorization: admin.token } }
      );
      if (data.success) {
        toast({
          title: "User Account Suspended!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      } else {
        toast({
          title: "Something went wrong!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
    <Container maxW="100%">
      <VStack>
        <chakra.div w="100%">
          <HStack
            p={4}
            bg={useColorModeValue("white", "gray.800")}
            rounded="xl"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.100", "gray.700")}
            w="100%"
            h="100%"
            textAlign="left"
            align="start"
            spacing={4}
            cursor="pointer"
            _hover={{ shadow: "lg" }}
            bgColor={user?.status === "suspended" && "#ffcccc"}
          >
            <Avatar
              name={`${user.firstName} ${user.lastName}`}
              // src='https://bit.ly/dan-abramov'
            />
            <HStack w="100%" justifyContent="space-between">
              <Flex direction="column">
                <Flex gap="1">
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    noOfLines={1}
                    onClick={(e) => e.stopPropagation()}
                    isExternal
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Text>
                  <HStack spacing="1">
                    <Tag size="sm" colorScheme="gray">
                      {user?.role}
                    </Tag>
                  </HStack>
                </Flex>
                <Text fontSize="sm" color={textColor} noOfLines={{ base: 2 }}>
                  {user.email}
                </Text>
              </Flex>
            </HStack>
            <Menu w="100%">
              <MenuButton as={Button} size="sm" w="fit-content">
                <Icon as={ChevronDownIcon} />
              </MenuButton>

              <MenuList>
                <MenuItem onClick={onOpen}>Delete</MenuItem>
                <MenuItem
                  onClick={() => {
                    activateHandler();
                  }}
                >
                  Activate
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    suspendHandler();
                  }}
                >
                  Suspend
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </chakra.div>
      </VStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteHandler();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default UserItem;
