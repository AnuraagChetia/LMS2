import * as React from "react";
import { Container, Text, SimpleGrid, Box } from "@chakra-ui/react";

const AdminStats = ({
  numberOfUsers,
  numberOfCourses,
  mostValuableTeacher,
}) => {
  const statData = [
    {
      id: 1,
      label: "Total number of users",
      score: numberOfUsers,
    },
    {
      id: 2,
      label: "Total number of courses:",
      score: numberOfCourses,
    },
    {
      id: 3,
      label: "Most valuable teacher",
      score: `${mostValuableTeacher[0]?.user?.firstName} ${mostValuableTeacher[0]?.user?.lastName}`,
    },
    {
      id: 3,
      label: `Sales by ${mostValuableTeacher[0]?.user?.firstName} ${mostValuableTeacher[0]?.user?.lastName}`,
      score: `₹${mostValuableTeacher[0]?.totalSales}`,
    },
  ];
  console.log(mostValuableTeacher);
  return (
    <Container maxW="100%" p={{ base: 5, md: 4 }} m="4">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={5}
        mt={12}
        mb={4}
      >
        {statData.map((data) => (
          <Box
            key={data.id}
            p={5}
            boxShadow="md"
            rounded="md"
            borderWidth={1}
            bgColor="white"
          >
            <Text fontWeight="extrabold" fontSize="x-large" noOfLines={2}>
              {data.score}
            </Text>
            <Text>{data.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default AdminStats;
