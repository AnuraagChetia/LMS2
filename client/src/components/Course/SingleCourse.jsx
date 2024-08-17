import React, { useEffect, useState } from "react";
import {
  chakra,
  Stack,
  Box,
  useColorModeValue,
  Container,
  Button,
  Image,
  ButtonGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Icon,
  Text,
  useToast,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { CgYoutube } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, updateStudent } from "../../store/userSlice";

const SingleCourse = () => {
  const { courseId } = useParams();
  const user = useSelector((state) => state.user);
  const [isInCart, setIsInCart] = useState(false);
  const [courseBought, setIsCourseBought] = useState(false);
  const [numberOfLectures, setNumberOfLectures] = useState(0);
  const [courseDuration, setCourseDuration] = useState();
  const [courseRatings, setCourseRatings] = useState();

  const [course, setCourse] = useState({
    instructor: { firstName: "", lastName: "" },
  });

  const dispatch = useDispatch();

  const convertMinutesToHours = (minutes) => {
    if (isNaN(minutes)) {
      return "Invalid input. Please provide a valid number of minutes.";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} hours and ${remainingMinutes} minutes`;
  };

  const getCourseDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`
      );
      setCourse(data.course);
      setNumberOfLectures((prev) => {
        let numberOfLectures = 0;
        data?.course?.modules.forEach((module) => {
          numberOfLectures += module.lectures.length;
        });

        return numberOfLectures;
      });

      courseRatingsCalculator(
        data.course.ratings.map((rating) => rating.ratings)
      );

      setCourseDuration((prev) => {
        let numberOfMins = 0;
        data?.course?.modules.forEach((module) => {
          module.lectures.forEach((lecture) => {
            numberOfMins += lecture.duration;
          });
        });
        return convertMinutesToHours(numberOfMins);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useToast();

  const addToCart = async () => {
    try {
      if (user.token === "") {
        return navigate("/login");
      }
      if (courseBought) {
        return navigate(`/${courseId}`);
      }
      if (isInCart) {
        //navigate to cart
        return navigate("/cart");
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/student/add-to-cart/${courseId}`,
        {},
        {
          headers: {
            Authorization: `${user.token}`,
          },
        }
      );
      if (data.success) {
        dispatch(addCart({ course: data.course, price: data.course.price }));
        setIsInCart(true);

        toast({
          title: "Added to cart",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const courseRatingsCalculator = (ratings) => {
    // Calculate the sum of all ratings
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);

    // Calculate the average rating
    const averageRating = sumOfRatings / ratings.length;

    // Display the average rating
    setCourseRatings(averageRating.toFixed(2));
    if (isNaN(averageRating.toFixed(2))) setCourseRatings(0);
  };

  const addToWishlistHandler = async () => {
    try {
      if (user?.student?.wishlist?.includes(courseId)) {
        const { data } = await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/student/remove-from-wishlist/${courseId}`,
          {},
          { headers: { Authorization: user.token } }
        );
        if (data.success) {
          dispatch(updateStudent(data.student));
        }
        return toast({
          title: "Removed from wishlist!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/student/add-to-wishlist/${courseId}`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        dispatch(updateStudent(data.student));
        toast({
          title: "Added to wishlist",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsInCart(user?.student?.cart?.includes(courseId));
    setIsCourseBought(user?.student?.courses?.includes(courseId));
  }, [user]);

  useEffect(() => {
    getCourseDetails();
  }, []);
  return (
    <Container maxW="100%" px="0">
      <Box
        pos="relative"
        boxShadow={useColorModeValue(
          "0 4px 6px rgba(160, 174, 192, 0.6)",
          "0 4px 6px rgba(9, 17, 28, 0.9)"
        )}
        bg="#1A1B1E"
        p={{ base: 0 }}
        overflow="hidden"
        // rounded="lg"
      >
        <Image
          objectFit="contain"
          src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
            course._id
          }/${course._id}.jpeg`}
          alt="Course thumbnail"
          fallbackSrc="https://via.placeholder.com/200"
          mx="auto"
          h="60"
          w="200"
          mt="10"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 720 350"
          style={{ position: "absolute", inset: "0", pointerEvents: "none" }}
        >
          <g fill="#fff" fillOpacity="0.1" clipPath="url(#a)">
            <path d="M650.023 55.55c-6.78-.558-13.401-2.139-19.762-4.548-17.76-6.734-38.778-4.98-54.808 5.343-19.727 12.706-30.764 37.663-26.885 60.807 1.873 11.179 6.84 22.835 2.652 33.369-7.629 19.192-37.848 18.017-49.142 35.309-8.487 12.993-2.455 30.61 6.494 43.289 16.701 23.66 43.803 40.36 72.718 42.021 28.913 1.662 58.818-12.816 73.345-37.869 3.349-5.778 5.919-12.14 6.421-18.8.84-11.135-4.105-21.946-4.418-33.108-.501-17.807 10.553-33.544 19.961-48.671 9.408-15.129 17.814-33.483 11.685-50.212-3.711-10.125-12.397-17.872-22.195-22.384-5.517-2.54-11.377-4.16-16.066-4.546zM160.188 222.681c-13.337-9.469-32.287-10.262-46.369-1.939-11.1 6.56-18.89 17.927-30.4 23.736-10.462 5.281-22.71 5.339-34.018 8.414a65.23 65.23 0 00-27.02 14.96c-7.111 6.567-12.987 16.701-9.189 25.606 2.774 6.501 9.717 10.004 16.13 12.977 27.547 12.772 57.744 25.854 87.295 18.865 11.99-2.834 23.024-8.872 33.006-16.097 14.794-10.704 28.144-25.169 31.724-43.076 3.58-17.907-8.136-34.2-21.159-43.446M77.277-59.39l-90.465 29.729c-12.845 4.222-25.97 8.59-36.642 16.894-10.674 8.3-18.591 21.452-16.956 34.873 1.141 9.35 6.76 17.718 13.9 23.863 23.014 19.816 57.058 17.088 86.565 24.273 39.656 9.655 76.523 38.852 116.692 31.619 31.999-5.759 56.797-36.385 58.655-68.844 1.856-32.457-17.54-64.401-45.804-80.468-28.263-16.069-64.487-18.99-85.945-11.94"></path>
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h720v350H0z"></path>
            </clipPath>
          </defs>
        </svg>
        <Stack
          pos="relative"
          zIndex={0}
          direction="column"
          spacing={5}
          textAlign="left"
          mx={{ base: 8, md: 20, lg: 40, xl: 80 }}
          my={{ base: 8, md: "" }}
        >
          <chakra.h1
            color="white"
            fontSize="4xl"
            lineHeight={1.2}
            fontWeight="bold"
            fontFamily=" PT Serif, serif"
          >
            {course.title}
          </chakra.h1>
          <chakra.h1
            color="gray.400"
            fontSize="xl"
            maxW="600px"
            lineHeight={1.2}
            fontFamily=" PT Serif, serif"
          >
            {course.description}
          </chakra.h1>
          <chakra.h1
            color="orange.400"
            fontSize="md"
            maxW="600px"
            lineHeight={1.0}
            alignItems="center"
            display="flex"
            gap="1"
            fontFamily=" PT Serif, serif"
          >
            {courseRatings}
            <Flex>
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
          </chakra.h1>
          <chakra.h1
            color="gray.400"
            fontSize="md"
            maxW="600px"
            lineHeight={0}
            fontFamily=" PT Serif, serif"
          >
            Created by {course.instructor.firstName}{" "}
            {course.instructor.lastName}
          </chakra.h1>
          <chakra.h1
            color="gray.400"
            fontSize="md"
            maxW="600px"
            lineHeight={0}
            fontFamily=" PT Serif, serif"
          >
            {course.language}
          </chakra.h1>
          <chakra.h1
            color="white"
            fontSize="3xl"
            maxW="600px"
            lineHeight={2.2}
            fontWeight={700}
          >
            ₹{course.price}
          </chakra.h1>

          <ButtonGroup display="flex" w="100%">
            <Button
              flex={1}
              onClick={() => {
                addToCart();
              }}
            >
              {courseBought && "Go to course"}
              {!courseBought && isInCart && "Go to Cart"}
              {!courseBought && !isInCart && "Add to cart"}
            </Button>
            {!courseBought && (
              <Tooltip label="Wishlist">
                <Button
                  onClick={() => {
                    addToWishlistHandler();
                  }}
                >
                  <Icon
                    as={CiHeart}
                    boxSize={6}
                    color={
                      user?.student?.wishlist?.includes(courseId) ? "red" : ""
                    }
                  />
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </Stack>
      </Box>
      <Box mx={{ base: 8, md: 40 }}>
        <Text fontSize="x-large" fontWeight="700" py="6">
          Course content
        </Text>
        {course?.modules?.length} sections • {numberOfLectures} lectures •
        {courseDuration} total length
        <Accordion
          mt="4"
          defaultIndex={[0]}
          border="1px"
          borderColor="#CBD5E0"
          allowMultiple
        >
          {/* Modules */}
          {course.modules?.map((module) => (
            <AccordionItem>
              <h2>
                <AccordionButton bgColor="#F7FAFC">
                  <AccordionIcon />
                  <Box as="span" flex="1" textAlign="left">
                    {module.title}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Accordion defaultIndex={[0]} allowMultiple>
                  {/* lectures */}
                  {module.lectures?.map((lecture) => (
                    <AccordionItem border={0}>
                      <h2>
                        <AccordionButton _hover={{ bgColor: "white" }}>
                          <Box as="span" flex="1" textAlign="left">
                            <Icon as={CgYoutube} /> {lecture.title}
                            <AccordionIcon />
                          </Box>
                          {lecture.duration}:00
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} ms="5">
                        {lecture.description}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                  {module.lectures.length === 0 && (
                    <Text>No lectures currently</Text>
                  )}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Container>
  );
};

export default SingleCourse;

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
