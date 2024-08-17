import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ViewCoursesItem from "./ViewCoursesItem";

const ViewCourses = () => {
  const [courses, setCourses] = useState();
  const user = useSelector((state) => state.user);
  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/get-courses`,
        {
          headers: { Authorization: user.token },
        }
      );
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user]);

  return (
    <Flex flexDirection="column" justifyContent="start" gap="6" w="100%">
      <Flex
        flexDirection="column"
        justifyContent="start"
        gap="6"
        w="100%"
        alignItems="center"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="600"
          w="100%"
          py="5"
          borderBottom="1px solid gainsboro"
        >
          Courses
        </Text>
      </Flex>
      {courses?.map((course) => (
        <ViewCoursesItem course={course} key={course._id} reload={getCourses} />
      ))}
      {courses?.length === 0 && (
        <Text textAlign="center">No courses available</Text>
      )}
    </Flex>
  );
};

export default ViewCourses;
