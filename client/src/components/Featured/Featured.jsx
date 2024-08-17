import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomCard from "../UI/Cards/CustomCard";
import axios from "axios";

const Featured = ({ coursess }) => {
  const [courses, setCourses] = useState(coursess);
  const [dataScienceFlag, setDataScienceFlag] = useState();
  const [developmentFlag, setDevelopmentFlag] = useState();
  const [businessFlag, setBusinessFlag] = useState();
  const [lifestyleFlag, setLifeStyleFlag] = useState();
  useEffect(() => {
    setCourses(coursess);
    // Use a Set to store unique categories
    const uniqueCategories = new Set();

    // Loop through courses to identify unique categories
    coursess.forEach((course) => {
      uniqueCategories.add(course.category);
    });

    // Update flags based on the presence of each category
    setDataScienceFlag(uniqueCategories.has("Data Science"));
    setDevelopmentFlag(uniqueCategories.has("Development"));
    setBusinessFlag(uniqueCategories.has("Business"));
    setLifeStyleFlag(uniqueCategories.has("Lifestyle"));
  }, [coursess]);
  return (
    <Box bgColor={"#F6F8FB"} pt={10}>
      <Heading
        as="h2"
        fontSize={{ base: "1.75rem", lg: "2rem", xl: "3rem" }}
        mt="10"
        mb="4"
        textAlign="center"
        fontFamily="DM Serif Display, serif"
        fontStyle="italic"
      >
        Discover <br />
        Our Top Courses
      </Heading>
      <Box mx={4}>
        <Tabs size={{ base: "md", lg: "lg" }} defaultIndex={0} isLazy>
          <TabList
            w={{ sm: "fit-content" }}
            m="auto"
            overflowX={{ base: "scroll", sm: "hidden" }}
            overflowY="hidden"
            fontFamily="DM Serif Display, serif"
          >
            <Tab>View all</Tab>
            <Tab>Data Science</Tab>
            <Tab>Development</Tab>
            <Tab>Business</Tab>
            <Tab>Lifestyles</Tab>
          </TabList>

          <TabPanels>
            {/* view all */}
            <TabPanel>
              <Wrap
                spacing={10}
                justify={"center"}
                mx={{ base: 0, md: "10", "2xl": "40" }}
              >
                {courses?.map((course) => (
                  <WrapItem
                    key={course._id}
                    w={{ base: "100%", md: "40%", lg: "30%" }}
                    justifyContent={"center"}
                  >
                    <CustomCard course={course} />
                  </WrapItem>
                ))}
                {courses?.length === 0 && <Text>No courses available</Text>}
              </Wrap>
            </TabPanel>
            {/* Data science */}
            <TabPanel>
              <Wrap
                spacing={10}
                justify={"center"}
                mx={{ base: 0, md: "10", "2xl": "40" }}
              >
                {courses?.map((course) => {
                  if (course.category === "Data Science") {
                    return (
                      <WrapItem
                        key={course._id}
                        w={{ base: "100%", md: "40%", lg: "30%" }}
                        justifyContent={"center"}
                      >
                        <CustomCard course={course} />
                      </WrapItem>
                    );
                  }
                })}
                {!dataScienceFlag && <Text>No courses available</Text>}
              </Wrap>
            </TabPanel>
            {/* Development */}
            <TabPanel>
              <Wrap
                spacing={10}
                justify={"center"}
                mx={{ base: 0, md: "10", "2xl": "40" }}
              >
                {courses?.map((course) => {
                  if (course.category === "Development") {
                    return (
                      <WrapItem
                        key={course._id}
                        w={{ base: "100%", md: "40%", lg: "30%" }}
                        justifyContent={"center"}
                      >
                        <CustomCard course={course} />
                      </WrapItem>
                    );
                  }
                })}
                {!developmentFlag && <Text>No courses available</Text>}
              </Wrap>
            </TabPanel>
            {/* Business */}
            <TabPanel>
              <Wrap
                spacing={10}
                justify={"center"}
                mx={{ base: 0, md: "10", "2xl": "40" }}
              >
                {courses?.map((course) => {
                  if (course.category === "business") {
                    setBusinessFlag(true);
                    return (
                      <WrapItem
                        key={course._id}
                        w={{ base: "100%", md: "40%", lg: "30%" }}
                        justifyContent={"center"}
                      >
                        <CustomCard course={course} />
                      </WrapItem>
                    );
                  }
                })}
                {!businessFlag && <Text>No courses available</Text>}
              </Wrap>
            </TabPanel>
            {/* Lifestyles */}
            <TabPanel>
              <Wrap
                spacing={10}
                justify={"center"}
                mx={{ base: 0, md: "10", "2xl": "40" }}
              >
                {courses?.map((course) => {
                  if (course.category === "Lifestyles") {
                    return (
                      <WrapItem
                        key={course._id}
                        w={{ base: "100%", md: "40%", lg: "30%" }}
                        justifyContent={"center"}
                      >
                        <CustomCard course={course} />
                      </WrapItem>
                    );
                  }
                })}
                {!lifestyleFlag && <Text>No courses available</Text>}
              </Wrap>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Featured;
