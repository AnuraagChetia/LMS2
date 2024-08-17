import React from "react";
import {
  chakra,
  Container,
  Box,
  HStack,
  VStack,
  Link,
  Text,
  Avatar,
  SimpleGrid,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import bg1 from "../../assets/BrowserCourse/browser-course-01.jpg";
import bg2 from "../../assets/BrowserCourse/browser-course-02.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const articles = [
  {
    id: 1,
    subtitle: "Start from today",
    title: "Become an instructor and spread your knowledge",
    btnContent: "Become instructor",
    nav: "/signup",
    bg: "bg1",
  },
  {
    id: 2,
    subtitle: "Discover your gain",
    title: "Keep your skilled centers of excellence competitive",
    nav: "/courses/all",
    btnContent: "Browser courses",
  },
];

const BrowserCourse = () => {
  return (
    <Container maxWidth="1200px" mx="auto" my="10" p={{ base: 5, md: 8 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {articles.map((article, index) => (
          <Card key={index} {...article} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

const Card = ({ subtitle, title, btnContent, bg, nav }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      p={4}
      rounded="md"
      bgImg={bg ? bg1 : bg2}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      transition="transform 0.3s ease-in-out"
      h="250"
      _hover={{ transform: "scale(1.05)" }}
    >
      <VStack spacing={2} mb={5} textAlign="left" w="70%">
        <chakra.h3
          fontSize="md"
          lineHeight={1.2}
          fontWeight="600"
          w="100%"
          color="blue"
        >
          {subtitle}
        </chakra.h3>
        <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
          {title}
        </chakra.h1>
      </VStack>
      <Button
        variant="solid"
        colorScheme="blue"
        onClick={() => {
          dispatch(logout());
          navigate(`${nav}`);
        }}
      >
        {btnContent}
      </Button>
    </Box>
  );
};

export default BrowserCourse;
