import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { LuMonitorPlay } from "react-icons/lu";
import React from "react";

const CourseContents = ({ modules, changeLecture }) => {
  return (
    <Flex direction="column" w={{ md: "16rem", lg: "19rem" }}>
      <Text w="100%" textAlign="center" py="3" boxShadow="sm">
        Course Contents
      </Text>
      {modules?.map((module, index) => (
        <Accordion key={module._id} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section {index + 1} : {module.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {module.lectures?.map((lecture, index) => (
              <Flex
                w="100%"
                key={lecture._id}
                _hover={{ bgColor: "gainsboro" }}
                direction="column"
                fontWeight="400"
                fontSize="15"
                cursor="pointer"
                onClick={() => {

                  //for demo 
                  // changeLecture(
                  //   "https://www.youtube.com/embed/w8avRbLx_FM?si=nqGD3AbY8eg_sdeV"
                  // );

                  //for production                  
                  changeLecture(
                    `${import.meta.env.VITE_BACKEND_URL}/course/get-lecture/${
                      module._id
                    }/${lecture._id}`
                  );
                }}
              >
                <AccordionPanel px="1">
                  <Flex direction="column" px="2">
                    <Text>
                      {index + 1}. {lecture.title}
                    </Text>
                    <Flex>
                      <Text display="flex" alignItems="center" mt="1">
                        <Icon as={LuMonitorPlay} mt="1" me="2" />
                        {lecture.duration} mins
                      </Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </Flex>
            ))}
          </AccordionItem>
        </Accordion>
      ))}
    </Flex>
  );
};

export default CourseContents;
