import React, { useState } from "react";
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
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
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import CourseLectureItem from "./CourseLectureItem";
import axios from "axios";
import { useSelector } from "react-redux";
const CourseModuleItem = ({ module, course, reload }) => {
  const user = useSelector((state) => state.user);
  const [accordionIsOpen, setAccordionIsOpen] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [duration, setDuration] = useState();
  const { courseTitle } = useParams();
  const navigate = useNavigate();

  const toast = useToast();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const cancelRef = React.useRef();

  const deleteModuleHandler = async () => {
    try {
      //delete module logic
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/course/module/delete/${
          course._id
        }/${module._id}`,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Successful.",
          position: "top-right",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  const addLectureHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("description", description);
      payload.append("duration", duration);
      payload.append("courseTitle", course.title);
      payload.append("moduleTitle", module.title);
      payload.append("file", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/course/module/lecture/upload/${
          module._id
        }`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Successful.",
          position: "top-right",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
        onCloseAdd();
        setTitle(null);
        setDescription(null);
        setDuration(null);
        setFile(null);
      }
    } catch (error) {
      toast({
        title: "Error.",
        position: "top-right",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <AccordionItem>
      <h2>
        <Flex
          onMouseOver={() => {
            setAccordionIsOpen(true);
          }}
          onMouseLeave={() => {
            setAccordionIsOpen(false);
          }}
        >
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {module.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          {accordionIsOpen && (
            <Flex>
              <Button
                borderRadius="0"
                colorScheme="green"
                // rightIcon={<FiEdit />}
                onClick={onOpenAdd}
              >
                Add
              </Button>
              <Modal isOpen={isOpenAdd} onClose={onCloseAdd}>
                <ModalOverlay />
                <form
                  encType="multipart/form-data"
                  onSubmit={addLectureHandler}
                >
                  <ModalContent>
                    <ModalHeader>Create new lecture</ModalHeader>
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
                        <FormLabel>Duration</FormLabel>
                        <Input
                          type="text"
                          placeholder="Add duration in mins"
                          onChange={(e) => {
                            setDuration(e.target.value);
                          }}
                        />
                        <FormLabel>Video</FormLabel>
                        <Input
                          type="file"
                          p="1"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onCloseAdd}>
                        Close
                      </Button>
                      <Button variant="ghost" type="submit">
                        Create
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </form>
              </Modal>
              <Button
                borderRadius="0"
                colorScheme="yellow"
                rightIcon={<FiEdit />}
                onClick={() => {
                  navigate(
                    `/dashboard/teacher/view-course/${courseTitle}/${module.title}`
                  );
                }}
              >
                Edit
              </Button>
              <Button
                borderRadius="0"
                colorScheme="red"
                rightIcon={<MdOutlineDeleteOutline />}
                onClick={onOpenDelete}
              >
                Delete
              </Button>
              {/* Prompt to delete module */}
              <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Module
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseDelete}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteModuleHandler();
                        }}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          )}
        </Flex>
      </h2>
      <AccordionPanel pb={4}>
        <Accordion defaultIndex={[0]} allowMultiple w="100%">
          {module.lectures?.map((lecture) => (
            <CourseLectureItem
              lecture={lecture}
              module={module}
              key={lecture._id}
            />
          ))}
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CourseModuleItem;
