import {
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import img from "../../assets/Courses/thumbnail.jpeg";
import { FaTag } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, updateStudent } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const CartItem = ({ courseId }) => {
  const user = useSelector((state) => state.user);

  const [course, setCourse] = useState({});
  const [numberOfLectures, setNumberOfLectures] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseRatings, setCourseRatings] = useState();
  const courseRatingsCalculator = (ratings) => {
    // Calculate the sum of all ratings
    const sumOfRatings = ratings?.reduce((sum, rating) => sum + rating, 0);

    // Calculate the average rating
    const averageRating = sumOfRatings / ratings?.length;

    // Display the average rating
    setCourseRatings(averageRating.toFixed(2));
    if (isNaN(averageRating.toFixed(2))) setCourseRatings(0);
  };
  useEffect(() => {
    courseRatingsCalculator(course?.ratings?.map((rating) => rating.ratings));
  }, [course]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/student/remove-from-cart/${
          course._id
        }`,
        {
          headers: { Authorization: user.token },
        }
      );

      if (data.success) {
        dispatch(removeCart({ course: course._id, price: course.price }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlistHandler = async () => {
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/student/add-to-wishlist/${courseId}`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        dispatch(updateStudent(data.student));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, []);
  return (
    <Stack direction="row" me="10" py="2">
      <Image src={img} boxSize="40" p="2" border="1px" m="2" />
      <Stack direction="column" mt={{ "2xl": "2" }}>
        <Flex flexDir="column">
          <Text
            as={Link}
            w="80%"
            fontWeight="600"
            fontSize="18"
            onClick={() => {
              navigate(`/course/${courseId}`);
            }}
          >
            {course?.title}
          </Text>
          <Text>
            By {course?.instructor?.firstName} {course?.instructor?.lastName}
          </Text>
        </Flex>
        <Text display="flex" alignItems="center" gap="1">
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
        </Text>
        <Text>
          {`${course?.duration} total hours | ${numberOfLectures} lectures |
          ${course?.level}`}
        </Text>
        <ButtonGroup>
          <Button
            p="0"
            bgColor="white"
            h="fit-content"
            color="blue"
            fontWeight="400"
            _hover={{ bgColor: "white", color: "gray" }}
            onClick={removeItemHandler}
          >
            Remove
          </Button>
          <Button
            p="0"
            bgColor="white"
            h="fit-content"
            color="blue"
            fontWeight="400"
            _hover={{ bgColor: "white", color: "gray" }}
            onClick={() => {
              addToWishlistHandler();
            }}
          >
            Add to wishlist
          </Button>
        </ButtonGroup>
      </Stack>
      <Text
        color="blue"
        display="flex"
        h="fit-content"
        alignItems="center"
        gap="1"
        mt="1"
      >
        ₹{course?.price}
        <Icon as={FaTag} color={"orange"} mt="1" />
      </Text>
    </Stack>
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

export default CartItem;
