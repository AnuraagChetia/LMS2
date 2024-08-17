import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const reviewData = [
  {
    avatarSrc:
      "https://s.gravatar.com/avatar/4f9135f54df98fe894a9f9979d600a87?s=80",
    review: `What a wonderful little cottage! More spacious and adorable than the What a wonderful little cottage! More spacious and adorable than the
            pictures show. We never met our hosts and...`,
    stars: 4,
    userName: "Ahmad",
    dateTime: "2 months ago",
  },
  {
    avatarSrc: "",
    review: `What a wonderful little cottage! More spacious and adorable than the
            pictures show. We never met our hosts, but we felt welcomed and...`,
    stars: 4,
    userName: "Ali",
    dateTime: "1 months ago",
  },
  {
    avatarSrc: "",
    review: `What a wonderful little cottage! More spacious and adorable than the
            pictures show. We never met our hosts, but we felt welcomed and...`,
    stars: 2,
    userName: "Zac",
    dateTime: "4 months ago",
  },
];

const ratingSummary = [
  { id: 1, rating: 5, percentage: "80%" },
  { id: 2, rating: 4, percentage: "65%" },
  { id: 3, rating: 3, percentage: "35%" },
  { id: 4, rating: 2, percentage: "75%" },
  { id: 5, rating: 1, percentage: "55%" },
];

const ReviewsTab = () => {
  const user = useSelector((state) => state.user);
  const [percentageByStar, setPercentageByStar] = useState({});
  const [ratings, setRatings] = useState();
  const [courseRatings, setCourseRatings] = useState();
  const { courseId } = useParams();
  const getRatings = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/student/course/get-ratings/${courseId}`,
        { headers: { Authorization: user.token } }
      );
      setRatings(data.ratings);
      courseRatingsCalculator(data?.ratings?.map((rating) => rating.ratings));
      // Initialize counters for each star level
      const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

      // Count the number of ratings for each star level
      data.ratings.forEach((rating) => {
        const starRating = rating.ratings;
        starCounts[starRating] += 1;
      });
      // Calculate the percentage for each star level
      const totalRatings = data.ratings.length;
      const percentages = {};
      for (const [star, count] of Object.entries(starCounts)) {
        percentages[star] = (count / totalRatings) * 100;
      }

      // Set the state with the calculated percentages
      setPercentageByStar(percentages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRatings();
  }, []);
  const courseRatingsCalculator = (ratings) => {
    // Calculate the sum of all ratings
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);

    // Calculate the average rating
    const averageRating = sumOfRatings / ratings.length;

    // Display the average rating
    setCourseRatings(averageRating.toFixed(2));
  };
  return (
    <Container maxW="100%" p={{ base: 5, md: 10 }} border="1px solid gainsboro">
      <Box mb={8}>
        <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={3}>
          Student rating summary
        </Heading>
        {ratings?.length !== 0 && (
          <Stack spacing={3}>
            <Box>
              <HStack spacing={3}>
                <Flex alignItems="center" justifyContent="start">
                  {Array.from({ length: courseRatings }, (_, index) => (
                    <Star key={index} fillColor="#EACA4E" />
                  ))}
                  {Array.from(
                    { length: 5 - Math.floor(courseRatings) },
                    (_, index) => (
                      <Star key={index} fillColor="#e2e8f0" />
                    )
                  )}
                </Flex>
                <Text fontWeight="bold" fontSize="lg">
                  {courseRatings}
                </Text>
              </HStack>
              <Text fontWeight="bold" fontSize="md">
                {ratings?.length} ratings
              </Text>
            </Box>

            <Stack direction="column" spacing={1}>
              {ratings?.map((rating) => {
                return (
                  <HStack key={rating._id} spacing={5}>
                    <Text fontWeight="bold" fontSize="md">
                      {rating.ratings}
                    </Text>
                    <Box w={{ base: "100%", md: "70%" }}>
                      <Box
                        w="100%"
                        bg={useColorModeValue("gray.300", "gray.600")}
                        rounded="md"
                      >
                        <Box
                          w={`${percentageByStar?.[rating.ratings]}%`}
                          h={3}
                          bg="yellow.400"
                          rounded="md"
                        ></Box>
                      </Box>
                    </Box>
                    <Text fontWeight="bold" fontSize="md">
                      {percentageByStar?.[rating.ratings]}%
                    </Text>
                  </HStack>
                );
              })}
            </Stack>
          </Stack>
        )}
      </Box>
      {ratings?.length !== 0 && (
        <Box>
          <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={4}>
            Student reviews
          </Heading>
          <Stack direction="column" spacing={5}>
            {ratings?.map((rating, index) => {
              return (
                <Box key={index} maxW="2xl">
                  <HStack spacing={3} mb={2}>
                    <Avatar
                      size="md"
                      name={`${rating.user?.firstName} ${rating.user?.lastName}`}
                      src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${
                        rating.user.userName
                      }/${rating.user.userName}.jpeg`}
                    />
                    <Stack direction="column" spacing={2}>
                      <Text fontWeight="bold" fontSize="md">
                        {rating?.user?.userName}
                      </Text>
                      <Flex alignItems="center" justifyContent="start">
                        {Array.from(Array(rating.ratings).keys()).map((id) => {
                          return <Star key={id} fillColor="#EACA4E" />;
                        })}
                        {Array.from(Array(5 - rating.ratings).keys()).map(
                          (id) => {
                            return <Star key={id} fillColor="#e2e8f0" />;
                          }
                        )}
                      </Flex>
                    </Stack>
                  </HStack>
                  <Text
                    color={useColorModeValue("gray.700", "gray.400")}
                    fontSize="0.87rem"
                    textAlign="left"
                    lineHeight="1.375"
                    fontWeight="300"
                  >
                    {rating?.comment}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
      {ratings?.length === 0 && (
        <Text
          textAlign="center"
          p="10"
          fontWeight="6800"
          color="silver"
          fontStyle="italic"
        >
          No ratings yet
        </Text>
      )}
    </Container>
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

export default ReviewsTab;
