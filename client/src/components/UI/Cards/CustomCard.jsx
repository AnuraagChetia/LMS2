import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiOutlineLaptop } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomCard = ({ course }) => {
  const navigate = useNavigate();
  const [courseRatings, setCourseRatings] = useState();
  const [numberOfRatings, setNumberOfRatings] = useState();
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
    setNumberOfRatings(course.ratings.length.toLocaleString());
    setNumberOfRatings(11000);
    courseRatingsCalculator(course.ratings.map((rating) => rating.ratings));
  }, [course]);
  return (
    <>
      <Card
        maxW="sm"
        boxShadow="lg"
        minH="490"
        fontFamily="DM Serif Display, serif"
      >
        <CardBody h="100%">
          <Image
            objectFit="contain"
            boxSize="200"
            src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
              course._id
            }/${course._id}.jpeg`}
            alt="Course thumbnail"
            fallbackSrc="https://via.placeholder.com/200"
            borderRadius="lg"
          />
          <Flex
            id="this"
            flexDir="column"
            mt="6"
            spacing="1"
            height="100%"
            justifyContent="space-between"
          >
            <Badge colorScheme="green" w="fit-content">
              {course.category}
            </Badge>
            <Heading
              size="md"
              noOfLines={3}
              minH="20"
              fontFamily="DM Serif Display, serif"
            >
              {course.title}
            </Heading>
            <Text
              color="orange.600"
              display={"flex"}
              fontSize="lg"
              alignItems={"center"}
            >
              <span style={{ marginRight: "4px" }}>{courseRatings}</span>

              {Array.from({ length: courseRatings }, (_, index) => (
                <Star key={index} fillColor="#EACA4E" />
              ))}
              {Array.from(
                { length: 5 - Math.floor(courseRatings) },
                (_, index) => (
                  <Star key={index} fillColor="#e2e8f0" />
                )
              )}
              <span
                style={{
                  fontSize: "small",
                  display: "flex",
                  alignItems: "center",
                  color: "gray",
                  marginLeft: "4px",
                  marginTop: "3px",
                }}
              >{`(${numberOfRatings?.toLocaleString()})`}</span>
            </Text>
            <Text color="blue.600" fontWeight={700} fontSize="2xl" mt={0}>
              ₹{course.price}
            </Text>
            <Flex mt="2">
              <Avatar
                name={`${course.instructor.firstName} ${course.instructor.lastName}`}
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  course.instructor.userName
                }/${course.instructor.userName}.jpeg`}
                bgColor="black"
                color="white"
              />
              <Box ml="3">
                <Text fontWeight="bold">
                  {course.instructor.firstName} {course.instructor.lastName}
                </Text>
                <Text fontSize="sm">
                  {course?.instructor?.teacher?.specialization}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </CardBody>
        <Divider />
        <CardFooter p="0">
          <ButtonGroup w="100%" spacing={0}>
            <Button
              variant="ghost"
              w="100%"
              disabled
              borderRight="1px solid black"
              borderRadius="0"
              leftIcon={<AiOutlineLaptop />}
              _hover={{ bgColor: "white" }}
            >
              12 Lectures
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              w="100%"
              fontWeight={700}
              borderRadius="0"
              p="0"
              onClick={() => {
                navigate(`/course/${course._id}`);
              }}
            >
              View Details
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
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
export default CustomCard;
