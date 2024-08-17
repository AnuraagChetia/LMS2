import React, { useEffect, useState } from "react";
import {
  AspectRatio,
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EditLecture = () => {
  const user = useSelector((state) => state.user);
  const [course, setCourse] = useState();
  const [module, setModule] = useState();
  const [lecture, setLecture] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [file, setFile] = useState();
  const { courseTitle, moduleTitle, lectureTitle } = useParams();

  const toast = useToast();

  const navigate = useNavigate();
  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/get-courses`,
        {
          headers: { Authorization: user.token },
        }
      );
      const desiredCourse = data.courses.find(
        (course) => course.title.trim() === courseTitle.trim()
      );
      setCourse(desiredCourse);
      const desiredModule = desiredCourse.modules.find(
        (module) => module.title === moduleTitle
      );
      setModule(desiredModule);

      const desiredLecture = desiredModule.lectures.find(
        (lecture) => lecture.title === lectureTitle
      );
      setLecture(desiredLecture);
      setTitle(desiredLecture.title);
      setDescription(desiredLecture.description);
      setDuration(desiredLecture.duration);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user]);

  const editLectureHandler = async (e) => {
    e.preventDefault();
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

      const payload = new FormData();
      payload.append("title", title);
      payload.append("description", description);
      payload.append("courseTitle", course.title);
      payload.append("moduleTitle", module.title);
      payload.append("duration", duration);
      payload.append("file", file);
      // console.log(file);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/course/module/update-lecture/${
          module._id
        }/${lecture._id}`,
        payload,
        { headers: { Authorization: user.token } }
      );
      console.log(data);
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
        w={{ base: "90%", md: "50vw" }}
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
          Edit {lectureTitle} lecture
        </Text>
        <form encType="multipart/form-data" onSubmit={editLectureHandler}>
          <FormControl>
            <FormLabel> Lecture title</FormLabel>
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
          <FormControl>
            <FormLabel>Enter duration</FormLabel>
            <Input
              type="number"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          </FormControl>
          <AspectRatio w="100%" ratio={6 / 3} mx="auto" my="10">
            <iframe
              src={`${import.meta.env.VITE_BACKEND_URL}/course/get-lecture/${
                module?._id
              }/${lecture?._id}`}
              title="lecture"
              allowFullScreen
            />
          </AspectRatio>
          <FormControl>
            <FormLabel>Change video</FormLabel>
            <Input
              type="file"
              p="1"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </FormControl>
          <Flex gap="1">
            <Button
              w="50%"
              mt="2"
              colorScheme="blue"
              borderRadius="0"
              type="submit"
            >
              Edit Lecture
            </Button>
            <Button
              w="50%"
              mt="2"
              colorScheme="red"
              borderRadius="0"
              onClick={() => {
                navigate(`/dashboard/teacher/view-course/${courseTitle}`);
              }}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default EditLecture;
