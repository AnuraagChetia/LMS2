import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/Navbar/logo.jpeg";
import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <Box p={{ base: 5, md: 8 }} maxW="90%" marginInline="auto">
      <Stack
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
      >
        <Box maxW="300px">
          <Image w="100px" src={logo} alt="LMS" />
          <Text
            mt={2}
            color="gray.500"
            fontSize="md"
            fontFamily="PT Serif, serif"
          >
            Great lesson ideas and lesson plans for ESL teachers! Educators can
            customize lessons as best plans to knowledge.{" "}
          </Text>
        </Box>
        <HStack
          spacing={4}
          d={{ base: "none", sm: "flex" }}
          justifyContent={{ sm: "space-between", md: "normal" }}
        >
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              About
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink href="/about">About us</CustomLink>
              <CustomLink href="/contact-us">Contact us</CustomLink>
              <CustomLink href="/career">Careers</CustomLink>
              <CustomLink>Privacy Policy</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Community
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>Chat on Discord</CustomLink>
              <CustomLink>Follow on Twitter</CustomLink>
              <CustomLink>Follow on Github</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Project
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>Brandon Infotech</CustomLink>
              <CustomLink>Documentation</CustomLink>
              <CustomLink>Github organization</CustomLink>
              <CustomLink>npm organization</CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>

      <Divider my={4} />

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
      >
        <Text fontSize="md">© 2023 LMS, Inc.</Text>
      </Stack>
    </Box>
  );
};

const CustomLink = ({ children, href }) => {
  const navigate = useNavigate();
  return (
    <Link
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      onClick={() => {
        navigate(`${href}`);
      }}
    >
      {children}
    </Link>
  );
};

export default Footer;
