import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import img from "../../assets/Courses/thumbnail.jpeg";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavCartItem = ({ courseId }) => {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    instructor: { firstName: "" },
  });

  const getCourseDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`
      );
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, []);
  return (
    <Flex
      direction="row"
      cursor="pointer"
      gap="2"
      onClick={() => {
        navigate(`/course/${course._id}`);
      }}
      _hover={{ bgColor: "gainsboro" }}
    >
      <Image src={img} boxSize="16" />
      <Flex direction="column" alignItems="start" gap="2" lineHeight="1">
        <Text isTruncated w={48}>
          {course.title}
        </Text>
        <Text>
          By {course.instructor.firstName} {course.instructor.lastName}
        </Text>
        <Text>₹{course.price}</Text>
      </Flex>
    </Flex>
  );
};

export default NavCartItem;
