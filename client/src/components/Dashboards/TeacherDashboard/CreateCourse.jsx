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
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const user = useSelector((state) => state.user);

  // refs
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const durationRef = useRef();
  const levelRef = useRef();
  const categoryRef = useRef();
  const tagsRef = useRef();
  const languageRef = useRef();
  const headlineRef = useRef();

  const navigate = useNavigate();

  const toast = useToast();

  //create course handler
  const createCourseHandler = async () => {
    try {
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      const price = parseFloat(priceRef.current.value);
      const duration = durationRef.current.value;
      const level = levelRef.current.value;
      const category = categoryRef.current.value;
      const headline = headlineRef.current.value;

      const language = languageRef.current.value
        .replace(/\s/g, "")
        .split(",")
        .map((tag) => tag);

      const tags = tagsRef.current.value
        .replace(/\s/g, "")
        .split(",")
        .map((tag) => tag);

      const payload = {
        title,
        description,
        price,
        duration,
        level,
        category,
        headline,
        tags,
        language,
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/course/add`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Course created!.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard/teacher/view-course/all");
      }
    } catch (error) {
      toast({
        title: "Something went wrong!.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <Flex w="100%" justifyContent="center">
      <Flex
        h={{ base: "fit-content", md: "fit-content" }}
        w={{ base: "90%", md: "50vw" }}
        boxShadow="lg"
        border="1px solid gainsboro"
        borderRadius={{ base: 0, md: 10 }}
        p="4"
        my={{ base: 0, md: 10 }}
        flexDirection="column"
      >
        <Text
          fontSize="30"
          py="2"
          mb="2"
          fontWeight="600"
          borderBottom="1px solid gainsboro"
        >
          Create a new course
        </Text>
        <FormControl>
          <FormLabel>Enter course title</FormLabel>
          <Input type="text" ref={titleRef} />
          <FormLabel>Enter description</FormLabel>
          <Input type="text" ref={descriptionRef} />
          <FormLabel>Enter headline</FormLabel>
          <Input type="text" ref={headlineRef} />
          <FormLabel>Enter price</FormLabel>
          <Input type="number" ref={priceRef} placeholder="Price in rupees" />
          <FormLabel>Enter duration</FormLabel>
          <Input
            type="number"
            ref={durationRef}
            placeholder="Duration in mins"
          />
          <FormLabel>Enter level</FormLabel>
          <Select variant="outline" placeholder="Choose a level" ref={levelRef}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
          <FormLabel>Enter language</FormLabel>
          <Input
            type="text"
            ref={languageRef}
            placeholder="English,Hindi,France"
          />

          <FormLabel>Enter category</FormLabel>
          <Select
            variant="outline"
            placeholder="Choose a category"
            ref={categoryRef}
          >
            <option value="Development">Development</option>
            <option value="Business">Business</option>
            <option value="Finance & Acounting">Finance & Accounting</option>
            <option value="IT & Software">IT & Software</option>
            <option value="Office Productivity">Office Productivity</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Photography Video">Photography Video</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Music">Music</option>
            <option value="Teaching & Academics">Teaching & Academics</option>
          </Select>
          <FormLabel>Enter tags</FormLabel>
          <Input
            type="text"
            placeholder="life,survival,cooking"
            ref={tagsRef}
          />
          <FormHelperText>Do not enter whitespaces</FormHelperText>
        </FormControl>
        <Text fontWeight="200" mt={{ base: 2, md: 6 }}>
          <span style={{ fontWeight: "600" }}>Note:</span> Add course thumbnail
          in edit course tab
        </Text>
        <Button
          mt={{ base: 0, md: 2 }}
          colorScheme="blue"
          onClick={createCourseHandler}
        >
          Create course
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateCourse;
