import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseSearchCard = ({ course, onClose }) => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDir="column"
      _hover={{ bgColor: "gainsboro" }}
      cursor="pointer"
      onClick={() => {
        navigate(`/course/${course._id}`);
        onClose();
      }}
      boxShadow="sm"
      p="2"
    >
      <Flex>
        <Image
          boxSize="16"
          src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
            course._id
          }/${course._id}.jpeg`}
          rounded="md"
          objectFit="cover"
          alt="cover image"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Flex flexDir="column" w="100%" justifyContent="center" ml="2" gap="2">
          <Text noOfLines={1} fontWeight="600">
            {course.title}
          </Text>
          <Text fontStyle="italic">{`${course.instructor.firstName} ${course.instructor.lastName}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CourseSearchCard;
