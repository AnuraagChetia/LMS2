import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditModule = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { courseTitle, moduleTitle } = useParams();
  const [course, setCourse] = useState();
  const [module, setModule] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const toast = useToast();

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/get-courses`,
        {
          headers: { Authorization: user.token },
        }
      );
      const desiredCourse = data.courses.find(
        (course) => course.title === courseTitle
      );
      setCourse(desiredCourse);
      setModule(
        desiredCourse.modules.find((module) => module.title === moduleTitle)
      );
      setTitle(
        desiredCourse.modules.find((module) => module.title === moduleTitle)
          .title
      );
      setDescription(
        desiredCourse.modules.find((module) => module.title === moduleTitle)
          .description
      );
      console.log(module);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user]);

  const editModuleHandler = async () => {
    try {
      if (!description || !title)
        return toast({
          title: "An Error Occured.",
          position: "top-right",
          description: "Please enter all the fields",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/course/module/update/${
          course._id
        }`,
        { id: module._id, title: title, description: description },
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Successful.",
          position: "top-right",
          description: "Module details have been updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard/teacher/view-course/all");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex w="100%" justifyContent="center">
      <Flex
        h="fit-content"
        w="50vw"
        border="1px solid gainsboro"
        borderRadius="10"
        p="4"
        my="10"
        flexDirection="column"
      >
        <Text
          fontSize="30"
          py="2"
          mb="2"
          fontWeight="600"
          borderBottom="1px solid gainsboro"
        >
          Edit {moduleTitle} module
        </Text>
        <FormControl>
          <FormLabel> Module title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Enter description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormControl>

        <Button
          mt="2"
          colorScheme="blue"
          onClick={() => {
            editModuleHandler();
          }}
        >
          Edit Module
        </Button>
      </Flex>
    </Flex>
  );
};

export default EditModule;
