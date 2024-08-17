import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CourseLectureItem = ({ module, lecture }) => {
  const user = useSelector((state) => state.user);
  const [accordionIsOpen, setAccordionIsOpen] = useState();
  const navigate = useNavigate();
  const { courseTitle } = useParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteLectureHandler = async () => {
    try {
      //delete lecture
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/course/module/delete-lecture/${
          module._id
        }/${lecture._id}`,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Deleted !.",
          position: "top-right",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        document.getElementById(`${lecture._id}`).remove();
      }
    } catch (error) {
      toast({
        title: "An Error Occured.",
        position: "top-right",
        description: "Something went wrong !",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      console.log(error);
    }
  };
  return (
    <Box id={lecture._id}>
      <AccordionItem
        onMouseOver={() => {
          setAccordionIsOpen(true);
        }}
        onMouseLeave={() => {
          setAccordionIsOpen(false);
        }}
      >
        <h2>
          <Flex>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {lecture.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            {accordionIsOpen && (
              <Flex>
                <Button
                  borderRadius="0"
                  colorScheme="yellow"
                  rightIcon={<FiEdit />}
                  onClick={() => {
                    navigate(
                      `/dashboard/teacher/view-course/${courseTitle}/${module.title}/${lecture.title}`
                    );
                  }}
                >
                  Edit
                </Button>
                <Button
                  borderRadius="0"
                  colorScheme="red"
                  rightIcon={<MdOutlineDeleteOutline />}
                  onClick={onOpen}
                >
                  Delete
                </Button>
                {/* Prompt to delete lecture */}
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Lecture
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
                            deleteLectureHandler();
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
        <AccordionPanel pb={4}>{lecture.description}</AccordionPanel>
      </AccordionItem>
    </Box>
  );
};

export default CourseLectureItem;
