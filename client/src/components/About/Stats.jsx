import React from "react";
import {
  Container,
  Text,
  SimpleGrid,
  Box,
  Center,
  Flex,
} from "@chakra-ui/react";

const statData = [
  {
    id: 1,
    label: "Learners",
    score: "67M+",
  },
  {
    id: 2,
    label: "Instructors",
    score: "75K+",
  },
  {
    id: 3,
    label: "Courses",
    score: "210K+",
  },
  {
    id: 4,
    label: "Course enrollments",
    score: "900M+",
  },
  {
    id: 5,
    label: "Languages",
    score: "75",
  },
  {
    id: 6,
    label: "Enterprise customers",
    score: "15K+",
  },
];

const Stats = () => {
  return (
    <Container
      maxW="100%"
      p={{ base: 5, md: 10 }}
      bgColor="#5624d0"
      color="white"
    >
      <Center>
        <Flex flexDir="column" textAlign="center" alignItems="center">
          <Text fontWeight="extrabold" fontSize="x-large" mb={2}>
            <Box
              as="span"
              display="inline-block"
              position="relative"
              fontWeight="700"
              fontFamily="Playfair Display serif"
              fontSize={{ base: 30 }}
            >
              We just keep growing
              <Box
                as="span"
                display="block"
                position="absolute"
                bg={"blue.600"}
                w={"100%"}
                h={"1px"}
              />
            </Box>
          </Text>
          <Text textAlign="center" w="90%">
            Our global community and our course catalog get bigger every day.
            Check out our latest numbers as of September 2023.
          </Text>
        </Flex>
      </Center>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 2, sm: 5 }}
        mt={12}
        mb={4}
      >
        {statData.map((data) => (
          <Box key={data.id} p={{ base: 2, sm: 5 }} textAlign="center">
            <Text fontWeight="bold" fontSize="xx-large">
              {data.score}
            </Text>
            <Text fontSize="sm">{data.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Stats;
