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
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Flex,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditCourseModal from "./EditCourseModal";

const ViewCoursesItem = ({ course, reload }) => {
  const user = useSelector((state) => state.user);
  const textColor = useColorModeValue("gray.500", "gray.200");
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = React.useRef();

  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleOpen = () => setDescriptionOpen(!descriptionOpen);

  //delete course handler
  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/delete-course/${
          course._id
        }`,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        reload();
        toast({
          title: "Course has been deleted!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //suspend course handler
  const suspendHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/deactivate-course/${
          course._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        reload();

        toast({
          title: "Course has been deactivated!.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //activate course handler
  const activateHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/activate-course/${
          course._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        reload();
        toast({
          title: "Course has been activated!.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //reload handler
  const reloadHandler = () => {
    reload();
  };
  return (
    <Container maxW="100%">
      <VStack onClick={toggleOpen}>
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
            _hover={{ shadow: "lg" }}
            justifyContent="space-between"
            boxShadow="md"
            bgColor={course.status === "deactivated" && "#ffcccc"}
            onClick={() => {
              navigate(`/dashboard/teacher/view-course/${course.title}`);
            }}
            cursor="pointer"
          >
            <Flex gap="4" alignItems="center">
              <Image
                src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
                  course._id
                }/${course._id}.jpeg`}
                size="sm"
                width={33}
                height={33}
                layout="fixed"
                rounded="md"
                objectFit="cover"
                alt="cover image"
                fallbackSrc="https://via.placeholder.com/150"
              />
              <VStack align="start" justifyContent="flex-start">
                <VStack spacing={0} align="start">
                  <HStack>
                    <Text
                      as={Link}
                      href={`${import.meta.env.VITE_FRONTEND_URL}/${
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

                  {!descriptionOpen && (
                    <Text
                      fontSize="sm"
                      color={textColor}
                      noOfLines={{ base: 2 }}
                    >
                      {course.description}
                    </Text>
                  )}

                  {descriptionOpen && (
                    <Text fontSize="sm" color={textColor}>
                      {course.description}
                    </Text>
                  )}
                </VStack>
              </VStack>
            </Flex>
            {/* Course Menu */}
            <Menu w="100%">
              <MenuButton
                as={Button}
                size="sm"
                w="fit-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Icon as={ChevronDownIcon} />
              </MenuButton>

              <MenuList>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <EditCourseModal course={course} reload={reloadHandler} />
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    activateHandler();
                  }}
                >
                  Activate
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
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
      {/* Alert box for delete course */}
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

export default ViewCoursesItem;
