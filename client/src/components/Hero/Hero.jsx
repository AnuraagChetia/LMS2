import { Box, Link, Heading, Flex, Text, Button } from "@chakra-ui/react";
import heroBg from "../../assets/Hero/hero.jpg";
import { useNavigate } from "react-router-dom";
import "react-awesome-slider/dist/styles.css";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      position="relative"
      bgImage={heroBg}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      p={6}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        background="rgba(0, 0, 0, 0.2)"
      />
      <Box
        margin="0 auto"
        maxW="64rem"
        py={{ base: "1rem", md: "5rem", lg: "8rem" }}
      >
        <Heading
          as="h2"
          fontSize={{ base: "2.25rem", lg: "3rem" }}
          mb="4"
          fontFamily="DM Serif Display, serif"
          fontWeight="200"
        >
          Discover 4500+ Courses from top Instructors Around the World
        </Heading>
        <Flex
          justifyContent="start"
          flexDirection={{ base: "column", lg: "row" }}
          align-items="center"
          maxWidth={{ lg: "42rem" }}
          marginX={{ base: "auto", md: "0", lg: "0" }}
        >
          <Flex
            flexDir="column"
            pr={{ base: 0, lg: 5 }}
            width={{ base: "100%", lg: "50%" }}
            mb={{ base: "1rem", lg: "0" }}
            fontFamily="DM Serif Display, serif"
          >
            <Text mb="0.5rem">
              Take your learning organization to the next level. to the next
              level. Who'll share their knowledge to people around the world.
            </Text>
            <Button
              as={Link}
              bg="#fff"
              color="#000000"
              px="2.5rem"
              py="1.5rem"
              width="full"
              border="2px solid #fff"
              rounded="md"
              _hover={{ bg: "gray.300", textDecoration: "none" }}
              onClick={() => {
                navigate("/courses/all");
              }}
              mt="10"
              fontFamily="DM Serif Display, serif"
              fontWeight="400"
            >
              View all courses
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
