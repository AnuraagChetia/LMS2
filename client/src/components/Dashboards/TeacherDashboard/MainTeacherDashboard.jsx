import React, { useEffect, useState } from "react";
import CourseSalesChart from "./Charts/CourseSalesChart";
import { Flex, Link, Text } from "@chakra-ui/react";
import StudentsInEachCourseChart from "./Charts/StudentsInEachCourseChart";
import axios from "axios";
import { useSelector } from "react-redux";

const MainTeacherDashboard = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState();
  const [highestSellingCourse, setHighestSellingCourse] = useState();

  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/get-courses`,
        { headers: { Authorization: user.token } }
      );
      setCourses(data.courses);
      let prevHighest = 0;
      data.courses.forEach((course) => {
        if (course.studentsEnrolled.length > prevHighest) {
          prevHighest = course.studentsEnrolled.length;
          setHighestSellingCourse(course);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Flex w="100%" h="100%" flexDir="column" bgColor="gainsboro">
      <Flex w="100%" p="4">
        <Text fontSize="x-large" fontWeight="600">
          Dashboard
        </Text>
      </Flex>
      <Flex bgColor="white" m="2" p="10">
        <Text fontSize="large" fontWeight="500" noOfLines={1}>
          Your higest selling course:{" "}
          {highestSellingCourse && (
            <a
              style={{ fontWeight: "400", fontStyle: "italic", color: "blue" }}
              href={`${import.meta.env.VITE_FRONTEND_URL}/course/${
                highestSellingCourse?._id
              }`}
              target="_blank"
            >
              {highestSellingCourse?.title}
            </a>
          )}
          {!highestSellingCourse && "No course available"}
        </Text>
      </Flex>
      <Flex flexDir={{ base: "column", xl: "row" }}>
        <CourseSalesChart courses={courses} />
        <StudentsInEachCourseChart courses={courses} />
      </Flex>
    </Flex>
  );
};

export default MainTeacherDashboard;
