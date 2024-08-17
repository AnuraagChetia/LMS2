import { Box, Flex, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { IoCodeSlashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiMusicNote1 } from "react-icons/ci";
import { SiGooglemybusiness } from "react-icons/si";
import { SiPaloaltosoftware } from "react-icons/si";
import { SiMarketo } from "react-icons/si";
import { TbBrandFunimation } from "react-icons/tb";
import { HiOutlinePhotograph } from "react-icons/hi";
import { SiPhotocrowd } from "react-icons/si";

const categories = [
  {
    category: "Development",
    description: "Take your journey with this course",
  },
  {
    category: "IT & Software",
    description: "Take your journey with this course",
  },
  {
    category: "Business",
    description: "Take your journey with this course",
  },
  {
    category: "Marketing",
    description: "Take your journey with this course",
  },
  {
    category: "Lifestyles",
    description: "Take your journey with this course",
  },
  {
    category: "Photography",
    description: "Take your journey with this course",
  },
  {
    category: "Art & Design",
    description: "Take your journey with this course",
  },
  {
    category: "Health & Fitness",
    description: "Take your journey with this course",
  },
  {
    category: "Music",
    description: "Take your journey with this course",
  },
];

const TopCategory = () => {
  const navigate = useNavigate();
  return (
    <Box mx={{ base: 0, md: "10", "2xl": "40" }}>
      <Heading
        as="h2"
        fontSize={{ base: "1.75rem", lg: "2rem", xl: "3rem" }}
        mt="10"
        mb="4"
        textAlign="center"
        fontFamily={"DM Serif Display, serif"}
        fontStyle="italic"
      >
        Explore <br />
        Our Top Categories
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        spacingX="40px"
        spacingY="20px"
        m={{ lg: 10, xl: 20 }}
      >
        {categories?.map((category) => (
          <Box
            height="80px"
            display={"flex"}
            border="1px"
            alignItems="center"
            borderColor="silver"
            borderRadius="10"
            m={{ base: 4 }}
            cursor="pointer"
            key={category.category}
            _hover={{ backgroundColor: "#CBD5E0" }}
            onClick={() => navigate(`/courses/${category.category.trim()}`)}
          >
            <Icon
              as={
                category.category == "Music"
                  ? CiMusicNote1
                  : category.category == "Business"
                  ? SiGooglemybusiness
                  : category.category == "Development"
                  ? IoCodeSlashOutline
                  : category.category == "IT & Software"
                  ? SiPaloaltosoftware
                  : category.category == "Marketing"
                  ? SiMarketo
                  : category.category == "Lifestyles"
                  ? TbBrandFunimation
                  : category.category == "Photography"
                  ? HiOutlinePhotograph
                  : category.category == "Art & Design"
                  ? SiPhotocrowd
                  : SiGooglemybusiness
              }
              boxSize={12}
              ms="4"
            />
            <Flex flexDirection="column" ms="4">
              <Heading
                as="h5"
                fontSize={{ base: "1.25rem" }}
                fontFamily="DM Serif Display, serif"
              >
                {category.category}
              </Heading>
              <Text
                fontFamily="DM Serif Display, serif"
                fontStyle="italic"
                color="gray.500"
              >
                {category.description}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TopCategory;
