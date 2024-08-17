import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AllCourses from "./AllCourses";
import Wishlist from "./Wishlist";

const MyLearning = () => {
  return (
    <Box>
      <Box>
        <Tabs>
          <Box bgColor="black" textColor="white">
            <Text fontSize="5xl" py="20" ps="10">
              My Learning
            </Text>
            <TabList ps="7">
              <Tab fontWeight="600">All courses</Tab>
              <Tab fontWeight="600">Wishlist</Tab>
            </TabList>
          </Box>

          <TabPanels>
            <TabPanel w="100%">
              <AllCourses />
            </TabPanel>

            <TabPanel>
              <Wishlist />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MyLearning;
