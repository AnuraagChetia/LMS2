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
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const courseThumbnail =
  "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80";

const CourseItem = ({ course, reload }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/course/${course._id}`,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Course deleted!",
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
        `${import.meta.env.VITE_BACKEND_URL}/admin/activateCourse/${
          course._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Course Activated!",
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
        `${import.meta.env.VITE_BACKEND_URL}/admin/deactivateCourse/${
          course._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Course suspended!",
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
            bgColor={course.status === "deactivated" && "#ffcccc"}
          >
            <Image
              objectFit="contain"
              src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
                course._id
              }/${course._id}.jpeg`}
              alt="Course thumbnail"
              fallbackSrc="https://via.placeholder.com/200"
              size="sm"
              width={33}
              height={33}
              layout="fixed"
              rounded="md"
            />
            <HStack w="100%" justifyContent="space-between">
              <HStack>
                <Text
                  as={Link}
                  href={`${import.meta.env.VITE_FRONTEND_URL}/course/${
                    course._id
                  }`}
                  fontWeight="bold"
                  fontSize="md"
                  noOfLines={1}
                  onClick={(e) => e.stopPropagation()}
                  isExternal
                >
                  {course.title}
                </Text>
                <HStack spacing="1">
                  <Tag size="sm" colorScheme="gray">
                    {course.category}
                  </Tag>
                </HStack>
              </HStack>
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

export default CourseItem;
