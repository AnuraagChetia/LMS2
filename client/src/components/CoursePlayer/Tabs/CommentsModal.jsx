import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Input,
  Textarea,
  Flex,
  useToast,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { ChatIcon } from "@chakra-ui/icons";

const CommentsModal = ({ question, questionIndex, reload }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reply, setReply] = useState();
  const { courseId } = useParams();

  const toast = useToast();

  const postReply = async () => {
    try {
      const newReply = {
        questionIndex: questionIndex,
        comment: reply,
        time: new Date(),
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/course/post-reply/${courseId}`,
        newReply,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        reload();
        setReply("");
      }
    } catch (error) {
      toast({
        title: "An Error Occured.",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Icon
        as={ChatIcon}
        boxSize="4"
        onClick={() => {
          onOpen();
        }}
        cursor="pointer"
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap="2">
            <Text>{question.question.comment}</Text>
            <Flex flexDir="column" gap="1">
              {question.replies.map((reply) => (
                <Flex
                  flexDir="column"
                  gap="1"
                  border="1px solid gainsboro"
                  py="2"
                  px="6"
                  borderRadius="20"
                >
                  <Flex justifyContent="space-between">
                    <Text>{reply.comment}</Text>
                    <Text color="blue" fontWeight="400">
                      {reply.sender}
                    </Text>
                  </Flex>
                  <Text>{moment(reply.time).fromNow()}</Text>
                </Flex>
              ))}
            </Flex>
            <Textarea
              placeholder="Enter reply"
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
            />
            <Button
              w="fit-content"
              onClick={() => {
                postReply();
              }}
            >
              Send
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentsModal;
