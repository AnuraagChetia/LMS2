import {
  Box,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CourseModuleItem from "./CourseModuleItem";

const CourseModule = () => {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [course, setCourse] = useState();
  const { courseTitle } = useParams();
  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/get-courses`,
        {
          headers: { Authorization: user.token },
        }
      );

      setCourse(
        data.courses.find(
          (course) => course.title.trim() === courseTitle.trim()
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user]);

  const createNewModuleHandler = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/course/module/add/${course._id}`,
        { title: title, description: description },
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Success.",
          position: "top-right",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        getCourses();
      }
    } catch (error) {
      toast({
        title: "An Error Occured.",
        position: "top-right",
        description: "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <Flex w="100%" alignItems="center" flexDirection="column">
      <Text
        as="h1"
        fontSize="24"
        noOfLines="2"
        w="70%"
        textAlign="center"
        mt="4"
      >
        {course?.title}
      </Text>
      <Button onClick={onOpen} mt="2">
        Create a new modules
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new module</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                createNewModuleHandler();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Accordion defaultIndex={[0]} allowMultiple w="100%" mt="4">
        {course?.modules?.map((module) => (
          <CourseModuleItem
            module={module}
            course={course}
            key={module._id}
            reload={getCourses}
          />
        ))}
      </Accordion>
    </Flex>
  );
};

export default CourseModule;
