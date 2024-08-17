import React from "react";
import {
  chakra,
  Stack,
  useColorModeValue,
  Container,
  Link,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CareerSection = () => {
  const navigate = useNavigate();
  return (
    <Container maxW="100%" p={{ base: 0 }}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={5}
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent="space-between"
        boxShadow="md"
        bg="#a435f0"
        color="white"
        p={{ base: 8, md: 16, xl: 20 }}
      >
        <Box>
          <chakra.h1
            fontSize="4xl"
            lineHeight={1.2}
            fontWeight="bold"
            fontFamily="PT Serif, serif"
          >
            Work with us
          </chakra.h1>
          <chakra.h2
            mt="2"
            fontSize={{ base: "md", md: "xl" }}
            lineHeight={1.3}
            fontWeight="400"
            fontFamily="PT Serif, serif"
          >
            At LMS, we’re all learners and instructors. We live out our values
            every day to create a culture that is diverse, inclusive, and
            committed to helping employees thrive.{" "}
          </chakra.h2>
        </Box>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 0, sm: 3 }}
          w={{ base: "100%", sm: "auto" }}
        >
          <Button
            href="#"
            color="white"
            variant="solid"
            size="lg"
            rounded="md"
            mb={{ base: 2, sm: 0 }}
            lineHeight={1}
            bg="#bb63f7"
            _hover={{ bg: "#4b196e" }}
            onClick={() => {
              navigate("/career");
            }}
            fontFamily="PT Serif, serif"
          >
            Join us
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CareerSection;
