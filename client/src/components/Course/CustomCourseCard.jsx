import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomCourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [courseRatings, setCourseRatings] = useState();

  const courseRatingsCalculator = (ratings) => {
    // Calculate the sum of all ratings
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);

    // Calculate the average rating
    const averageRating = sumOfRatings / ratings.length;

    // Display the average rating
    setCourseRatings(averageRating.toFixed(2));
    if (isNaN(averageRating.toFixed(2))) setCourseRatings(0);
  };

  useEffect(() => {
    courseRatingsCalculator(course.ratings.map((rating) => rating.ratings));
  }, [course]);

  return (
    <Flex
      ms="0"
      mx="3"
      p="3"
      pe="6"
      _hover={{
        backgroundColor: "gray.100",
        filter: "grayscale(50%)", // Adding a greyscale effect
        transition: "0.4s ease-in-out", // Adding a smooth transition
      }}
      cursor="pointer"
      borderRadius="10"
      onClick={() => {
        navigate(`/course/${course._id}`);
      }}
    >
      <Image
        objectFit="contain"
        boxSize="40"
        src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
          course._id
        }/${course._id}.jpeg`}
        alt="Course thumbnail"
        fallbackSrc="https://via.placeholder.com/200"
        borderRadius="lg"
      />
      <Stack direction="column" ms="6" fontWeight="400" gap={0}>
        <Text
          fontWeight="800"
          fontFamily="DM Serif Display, serif"
          letterSpacing="1.1px"
        >
          {course.title}
        </Text>
        <Text display={{ md: "none" }}>₹{course.price}</Text>
        <Text>{course.description}</Text>
        <Text fontSize="12" fontFamily=" PT Serif, serif">
          {course.instructor.firstName} {course.instructor.lastName}
        </Text>
        <Text display="flex" alignItems="center">
          {Array.from({ length: courseRatings }, (_, index) => (
            <Star key={index} fillColor="#EACA4E" />
          ))}
          {Array.from({ length: 5 - Math.floor(courseRatings) }, (_, index) => (
            <Star key={index} fillColor="#e2e8f0" />
          ))}
          {courseRatings}
        </Text>
        <Text>{`${course.duration} hrs | ${course.lectures || "2 lectures"} | ${
          course.level
        }`}</Text>
      </Stack>
      <Text display={{ base: "none", md: "flex" }} ms="10">
        ₹{course.price}
      </Text>
    </Flex>
  );
};
const Star = ({ fillColor }) => {
  return (
    <svg
      style={{
        width: "1rem",
        height: "1rem",
        fill: fillColor,
        marginRight: "0.25rem",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};

export default CustomCourseCard;
