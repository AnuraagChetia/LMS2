import React, { useEffect, useState } from "react";
import img from "../../assets/Courses/thumbnail.jpeg";
import axios from "axios";
import {
  Button,
  Container,
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCart,
  removeFromWishlist,
  updateStudent,
} from "../../store/userSlice";

const CourseItemCard = ({ courseId, wishlist }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [courseRatings, setCourseRatings] = useState();
  const [reviewComment, setReviewComment] = useState();
  const [flag, setFlag] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const dispatch = useDispatch();

  const getCourseDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`
      );
      setCourse(data.course);
      courseRatingsCalculator(
        data.course.ratings.map((rating) => rating.ratings)
      );
    } catch (error) {
      if (error.response.data.success === false) {
        setFlag(false);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, []);

  const rateHandler = async (ratings) => {
    try {
      if (!reviewComment) {
        return toast({
          title: "Please provide your review!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/student/course/rate/${courseId}`,
        { ratings: ratings, comment: reviewComment },
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        onClose();
        toast({
          title: "You have rated the course!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        getCourseDetails();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An Error Occured.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const courseRatingsCalculator = (ratings) => {
    // Calculate the sum of all ratings
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);

    // Calculate the average rating
    const averageRating = sumOfRatings / ratings.length;

    // Display the average rating
    setCourseRatings(averageRating.toFixed(2));
    if (isNaN(averageRating.toFixed(2))) setCourseRatings(0);
  };

  const addToCartAndRemoveFromWishListHandler = async () => {
    try {
      let { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/student/remove-and-add-to-cart/${courseId}`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        dispatch(updateStudent(data.student));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!flag) return <></>;
  return (
    <Flex
      flexDir="column"
      p="2"
      w={60}
      boxShadow="lg"
      cursor="pointer"
      onClick={() => {
        navigate(`/${course._id}`);
      }}
      _hover={{ boxShadow: "dark-lg" }}
      justifyContent="space-between"
    >
      <Image
        fallbackSrc="https://via.placeholder.com/200"
        objectFit="contain"
        h="60"
        w="200"
        src={`${import.meta.env.VITE_BACKEND_URL}/courseThumbnails/${
          course._id
        }/${course._id}.jpeg`}
        alt="Course thumbnail"
        borderRadius="lg"
      />
      <Text w="100%" noOfLines={2} flexWrap={"wrap"} fontWeight="600">
        {course?.title}
      </Text>
      <Text>
        {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
      </Text>
      <Text display="flex" alignItems="center" color="orange" gap="0">
        {Array.from({ length: courseRatings }, (_, index) => (
          <Star key={index} fillColor="#EACA4E" />
        ))}
        {Array.from({ length: 5 - Math.floor(courseRatings) }, (_, index) => (
          <Star key={index} fillColor="#e2e8f0" />
        ))}
        {courseRatings}
      </Text>
      {wishlist && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            //add to cart and remove from wishlist
            addToCartAndRemoveFromWishListHandler();
          }}
        >
          Add to cart
        </Button>
      )}
      {!wishlist && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          Rate
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody display="flex" flexDir="column" gap="10">
            <Flex alignItems="center" justifyContent="start" gap="2" mt="10">
              <Text fontSize="xl" fontWeight="600">
                Rate:
              </Text>
              <Box
                cursor="pointer"
                onClick={() => {
                  rateHandler(1);
                }}
              >
                <Star fillColor="#e2e8f0" size="2rem" />
              </Box>
              <Box
                cursor="pointer"
                onClick={() => {
                  rateHandler(2);
                }}
              >
                <Star fillColor="#e2e8f0" size="2rem" />
              </Box>
              <Box
                cursor="pointer"
                onClick={() => {
                  rateHandler(3);
                }}
              >
                <Star fillColor="#e2e8f0" size="2rem" />
              </Box>
              <Box
                cursor="pointer"
                onClick={() => {
                  rateHandler(4);
                }}
              >
                <Star fillColor="#e2e8f0" size="2rem" />
              </Box>
              <Box
                cursor="pointer"
                onClick={() => {
                  rateHandler(5);
                }}
              >
                <Star fillColor="#e2e8f0" size="2rem" />
              </Box>
            </Flex>
            <Textarea
              mb="10"
              mt="0"
              placeholder="Type your review here"
              onChange={(e) => {
                setReviewComment(e.target.value);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
const Star = ({ fillColor, size }) => {
  return (
    <svg
      style={{
        width: size || "1rem",
        height: size || "1rem",
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
export default CourseItemCard;
