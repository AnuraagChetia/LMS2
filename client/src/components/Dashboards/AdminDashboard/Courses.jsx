import { Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseItem from "./CourseItem";

const Courses = () => {
  const [courses, setCourses] = useState();
  const user = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredCourses, setFilteredCourses] = useState();
  // Function to handle search bar input change.
  const searchhandler = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredItems);
  };

  const getCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-courses`,
        {
          headers: { Authorization: user.token },
        }
      );
      setCourses(data.courses);
      setFilteredCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user]);
  return (
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
      <Input
        type="text"
        w="50%"
        placeholder="Search a course"
        onChange={searchhandler}
      />
      {filteredCourses?.map((course) => (
        <CourseItem course={course} key={course._id} reload={getCourses} />
      ))}
      {filteredCourses?.length === 0 && <Text>No courses available</Text>}
    </Flex>
  );
};

export default Courses;
