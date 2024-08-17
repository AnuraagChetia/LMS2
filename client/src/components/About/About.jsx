import { Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import image1 from "../../assets/About/about1.png";
import FeatureList from "./FeatureList";
import Stats from "./Stats";
import CareerSection from "./CareerSection";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column">
      <Flex
        justifyContent={{ base: "center" }}
        maxH={{ base: "20rem", xl: "28rem" }}
      >
        <Text
          display={{ base: "none", md: "flex" }}
          maxW="363px"
          fontWeight="bold"
          fontSize={{ base: "2.5rem" }}
          textAlign="left"
          alignSelf="center"
          ps="10"
          fontFamily="Playfair Display serif"
        >
          We share the knowledge with the world
        </Text>
        <Image
          w={{ base: "100%", md: "50%" }}
          src={image1}
          objectFit="contain"
          objectPosition={{ md: "right" }}
        />
      </Flex>
      <Text
        display={{ md: "none" }}
        p="4"
        bgColor="#a435f0"
        fontWeight="600"
        textAlign="center"
        color="white"
        fontSize={{ xl: "larger" }}
      >
        We share knowledge with the world
      </Text>
      <Text
        as={Link}
        onClick={() => {
          navigate("/courses/all");
        }}
        display={{ base: "none", md: "block" }}
        p="4"
        bgColor="#a435f0"
        fontWeight="600"
        textAlign="center"
        color="white"
        fontSize={{ xl: "larger" }}
      >
        Check our latest courses
      </Text>
      <Flex flexDir="column" alignItems="center" p={{ base: 10, md: 20 }}>
        <Text
          textAlign="center"
          fontSize={{ base: "26px", xl: "2.5rem" }}
          w={{ base: "70%" }}
          lineHeight="1.2"
          fontWeight="800"
          fontFamily="PT Serif, serif"
        >
          Improving lives through learning
        </Text>
        <Text
          fontSize={{ base: "16px", xl: "1.2rem" }}
          lineHeight="135%"
          w={{ base: "90%", xl: "60%" }}
          mt="4"
          textAlign="center"
          fontFamily=" PT Serif, serif"
        >
          Whether you want to learn or to share what you know, you’ve come to
          the right place. As a global destination for online learning, we
          empower organizations and individuals with flexible and effective
          skill development.
        </Text>
      </Flex>
      <Stats />
      <FeatureList />
      <CareerSection />
    </Flex>
  );
};

export default About;
