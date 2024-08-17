import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UsersCountChart from "./Charts/UsersCountChart";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminStats from "./AdminStats";
import TotalCoursesInEachCategory from "./Charts/TotalCoursesInEachCategory";

const MainDashboard = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const [highestSellingCourse, setHighestSellingCourse] = useState();
  const [highestSeller, setHighestSeller] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-users`,
        { headers: { Authorization: user.token } }
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/all`,
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
  const getAllTeachers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-teachers`,
        { headers: { Authorization: user.token } }
      );
      let teachers = data.teachers.sort((a, b) => b.totalSales - a.totalSales);
      setHighestSeller(teachers.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
    getAllCourses();
    getAllTeachers();
  }, []);

  return (
    <Flex w="100%" flexDir="column" bgColor="gainsboro">
      <Flex w="100%" p="4">
        <Text fontSize="x-large" fontWeight="600" fontStyle="italic">
          Dashboard
        </Text>
      </Flex>
      <Flex bgColor="gainsboro">
        <AdminStats
          numberOfUsers={users?.length}
          numberOfCourses={courses?.length}
          mostValuableTeacher={highestSeller}
        />
      </Flex>
      <Flex flexDir={{ base: "column", xl: "row" }} bgColor="gainsboro">
        <UsersCountChart users={users} />
        <TotalCoursesInEachCategory courses={courses} />
      </Flex>
    </Flex>
  );
};

export default MainDashboard;
