import { ChatIcon, CloseIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentsModal from "./CommentsModal";
const qnaData = [
  {
    id: 1,
    question: "What are the prerequisites for this course?",
    replies: [
      {
        userId: "instructor123",
        reply:
          "This course assumes basic knowledge of programming and familiarity with [specific tools or technologies].",
        dateTime: "2022-01-01T10:30:00Z",
      },
      {
        userId: "student456",
        reply: "I'm a beginner. Will this course be too advanced for me?",
        dateTime: "2023-01-02T15:45:00Z",
      },
      {
        userId: "instructor123",
        reply:
          "No worries! The course is designed to accommodate beginners and experienced learners. We cover the basics before diving into more advanced topics.",
        dateTime: "2023-01-03T09:00:00Z",
      },
    ],
  },
  {
    id: 2,
    question: "Is there a certificate provided upon completion?",
    replies: [
      {
        userId: "student789",
        reply: "Is the certificate recognized by industry employers?",
        dateTime: "2023-01-05T12:20:00Z",
      },
      {
        userId: "instructor123",
        reply:
          "Absolutely! Our certificates are recognized in the industry and can be a valuable addition to your resume.",
        dateTime: "2023-01-06T14:10:00Z",
      },
    ],
  },
  {
    id: 3,
    question: "What are the prerequisites for this course?",
    replies: [
      {
        userId: "instructor123",
        reply:
          "This course assumes basic knowledge of programming and familiarity with [specific tools or technologies].",
        dateTime: "2022-01-01T10:30:00Z",
      },
      {
        userId: "student456",
        reply: "I'm a beginner. Will this course be too advanced for me?",
        dateTime: "2023-01-02T15:45:00Z",
      },
      {
        userId: "instructor123",
        reply:
          "No worries! The course is designed to accommodate beginners and experienced learners. We cover the basics before diving into more advanced topics.",
        dateTime: "2023-01-03T09:00:00Z",
      },
    ],
  },
  {
    id: 4,
    question: "Is there a certificate provided upon completion?",
    replies: [
      {
        userId: "student789",
        reply: "Is the certificate recognized by industry employers?",
        dateTime: "2023-01-05T12:20:00Z",
      },
      {
        userId: "instructor123",
        reply:
          "Absolutely! Our certificates are recognized in the industry and can be a valuable addition to your resume.",
        dateTime: "2023-01-06T14:10:00Z",
      },
    ],
  },
  // ... additional Q&A entries
];
const QnATab = ({ course, reload }) => {
  const user = useSelector((state) => state.user);
  const [noOfComments, setNoOfComments] = useState(2);
  const [filteredQnA, setFilteredQnA] = useState(qnaData);
  const [searchTerm, setSearchItem] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [QnA, setQnA] = useState([]);

  const { courseId } = useParams();

  const toast = useToast();

  //search question handler
  const searchhandler = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = QnA.filter((data) =>
      data.question.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredQnA(filteredItems);
  };

  const reloadHandler = () => {
    reload();
  };

  //submit new question
  const formSubmitHandler = async () => {
    try {
      const date = new Date();
      const payload = { comment: newQuestion, time: date };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/course/post-question/${courseId}`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        setNewQuestion("");
        reload();
        toast({
          title: "Posted!",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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

  useEffect(() => {
    setQnA(course?.QnA);
    setFilteredQnA(course?.QnA);
  }, [course]);
  return (
    <Flex direction="column">
      <InputGroup display="flex" alignItems="center">
        <Input
          placeholder="Search all course questions"
          borderRadius={0}
          value={searchTerm}
          onChange={searchhandler}
        />
        {searchTerm && (
          <InputRightElement
            onClick={() => {
              setSearchItem("");
              setFilteredQnA(qnaData);
            }}
          >
            <CloseIcon />
          </InputRightElement>
        )}
        {!searchTerm && (
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        )}
      </InputGroup>
      <Text fontSize="20" fontWeight="700" mt="5">
        All questions in this course
      </Text>
      {QnA?.length !== 0 && (
        <>
          <Stack direction="column" mt="5" divider={<StackDivider />}>
            {filteredQnA?.slice(0, noOfComments).map((data, index) => (
              <Flex justifyContent="space-between" key={data._id}>
                <Flex direction="column" gap="1">
                  <Text>{data?.question.comment} </Text>
                  {data?.replies?.length !== 0 && (
                    <>
                      <Text fontWeight="400" noOfLines={1}>
                        {data?.replies[0]?.comment}
                      </Text>
                      <Text
                        fontSize="14"
                        fontWeight="400"
                        display="flex"
                        gap="1"
                      >
                        <span style={{ color: "blue" }}>
                          {data?.replies[0]?.sender}
                        </span>
                        <span style={{ fontWeight: "500" }}>
                          {moment(data?.replies[0]?.time).fromNow()}
                        </span>
                      </Text>
                    </>
                  )}
                </Flex>
                <Flex h="fit-content" alignItems={"center"} gap="1">
                  <Text mb="0.5">{data?.replies?.length}</Text>
                  <CommentsModal
                    questionIndex={index}
                    question={data}
                    reload={reloadHandler}
                  />
                </Flex>
              </Flex>
            ))}
            {filteredQnA?.length === 0 && (
              <Flex direction="column" gap="1" fontWeight="500">
                <Text>
                  No questions mentioning
                  <span style={{ fontWeight: "700" }}>'{searchTerm}'</span>
                </Text>
                <Text>
                  No questions matched your search. Try searching with another
                  term.
                </Text>
              </Flex>
            )}
          </Stack>
          {noOfComments < filteredQnA?.length && (
            <Button
              bg="none"
              border="1px solid black"
              borderRadius="0"
              mt="10"
              onClick={() => {
                setNoOfComments((prev) => prev + 2);
              }}
            >
              See more
            </Button>
          )}
        </>
      )}
      {QnA?.length === 0 && (
        <Text
          textAlign="center"
          p="10"
          fontWeight="6800"
          color="silver"
          fontStyle="italic"
        >
          No questions asked
        </Text>
      )}
      <Text fontSize="20" mt="5" mb="2">
        Ask a question
      </Text>
      <FormControl>
        <Textarea
          placeholder="Enter your question"
          onChange={(e) => {
            setNewQuestion(e.target.value);
          }}
          value={newQuestion}
        />
        <Button
          mt="2"
          colorScheme="blue"
          onClick={() => {
            formSubmitHandler();
          }}
        >
          Submit
        </Button>
      </FormControl>
    </Flex>
  );
};

export default QnATab;
