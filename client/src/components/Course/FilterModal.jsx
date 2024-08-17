import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const FilterModal = ({
  categories,
  levels,
  duration,
  setFilteredCourses,
  courses,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const [ratingsValue, setRatingsValue] = useState();
  const [categoryValue, setCategoryValue] = useState("all");
  const [levelValue, setLevelValue] = useState();
  const [durationValue, setDurationValue] = useState();
  const [languageValue, setLanguageValue] = useState();
  const [priceValue, setPriceValue] = useState();

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FaFilter />}
        size="sm"
        display={{ base: "flex", md: "none" }}
      >
        Filters
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Courses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowMultiple>
              {/* Ratings */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Ratings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    onChange={(value) => {
                      setRatingsValue(value);
                      setFilteredCourses((prev) => {
                        return courses.filter(
                          (course) => course.ratings >= parseInt(value)
                        );
                      });
                    }}
                    value={ratingsValue}
                  >
                    <Stack direction="column">
                      <Radio value="4.5">
                        <Text
                          color="orange.600"
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star key={index} fillColor="#EACA4E" />
                          ))}
                          {Array.from(
                            { length: 5 - Math.floor(5) },
                            (_, index) => (
                              <Star key={index} fillColor="#e2e8f0" />
                            )
                          )}
                          4.5 & up
                        </Text>
                      </Radio>
                      <Radio value="4.0">
                        <Text
                          color="orange.600"
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          {Array.from({ length: 4 }, (_, index) => (
                            <Star key={index} fillColor="#EACA4E" />
                          ))}
                          {Array.from(
                            { length: 5 - Math.floor(4) },
                            (_, index) => (
                              <Star key={index} fillColor="#e2e8f0" />
                            )
                          )}
                          4.0 & up
                        </Text>
                      </Radio>
                      <Radio value="3.5">
                        <Text
                          color="orange.600"
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          {Array.from({ length: 3 }, (_, index) => (
                            <Star key={index} fillColor="#EACA4E" />
                          ))}
                          {Array.from(
                            { length: 5 - Math.floor(3) },
                            (_, index) => (
                              <Star key={index} fillColor="#e2e8f0" />
                            )
                          )}
                          3.5 & up
                        </Text>
                      </Radio>
                      <Radio value="3.0">
                        <Text
                          color="orange.600"
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          {Array.from({ length: 2 }, (_, index) => (
                            <Star key={index} fillColor="#EACA4E" />
                          ))}
                          {Array.from(
                            { length: 5 - Math.floor(2) },
                            (_, index) => (
                              <Star key={index} fillColor="#e2e8f0" />
                            )
                          )}
                          2.0 & up
                        </Text>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
              {/* Duration */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Duration
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    onChange={(value) => {
                      let upperLimit;
                      switch (parseInt(value)) {
                        case 0:
                          upperLimit = 1;
                          break;
                        case 1:
                          upperLimit = 3;
                          break;
                        case 3:
                          upperLimit = 6;
                          break;
                        case 6:
                          upperLimit = 17;
                          break;
                        case 17:
                          upperLimit = 9999;
                          break;
                        default:
                          // Handle the default case if needed
                          break;
                      }
                      setDurationValue(parseInt(value));
                      setFilteredCourses((prev) => {
                        return courses.filter(
                          (course) =>
                            course.duration >= value &&
                            course.duration <= upperLimit
                        );
                      });
                    }}
                    value={durationValue}
                  >
                    <Stack direction="column">
                      {duration.map((hours) => (
                        <Radio value={hours.lower} key={hours.lower}>
                          <Text
                            display={"flex"}
                            fontSize="sm"
                            alignItems={"center"}
                          >
                            {hours.lower === 17 && `${hours.lower}+ hrs`}
                            {hours.lower !== 17 &&
                              `${hours.lower}-${hours.upper} hrs`}
                          </Text>
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
              {/* Category */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Category
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    onChange={(value) => {
                      setCategoryValue(value);
                      navigate(`/courses/${value.toLowerCase()}`);
                    }}
                    value={categoryValue}
                  >
                    <Stack direction="column">
                      {categories.map((category) => (
                        <Radio value={category} key={category}>
                          <Text
                            display={"flex"}
                            fontSize="sm"
                            alignItems={"center"}
                          >
                            {category}
                          </Text>
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
              {/* Level */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Level
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    onChange={(value) => {
                      setLevelValue(value);
                      setFilteredCourses(
                        courses.filter(
                          (course) =>
                            course.level.toLowerCase() === value.toLowerCase()
                        )
                      );
                    }}
                    value={levelValue}
                  >
                    <Stack direction="column">
                      {levels?.map((level) => (
                        <Radio value={level} key={level}>
                          <Text
                            display={"flex"}
                            fontSize="sm"
                            alignItems={"center"}
                          >
                            {level}
                          </Text>
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
              {/* Language */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Language
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    value={languageValue}
                    onChange={(value) => {
                      setLanguageValue(value);
                      setFilteredCourses(
                        courses.filter(
                          (course) => course.language === value.toLowerCase()
                        )
                      );
                    }}
                  >
                    <Stack direction="column">
                      <Radio value="English">
                        <Text
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          English
                        </Text>
                      </Radio>
                      <Radio value="Hindi">
                        <Text
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          Hindi
                        </Text>
                      </Radio>
                      <Radio value="France">
                        <Text
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          France
                        </Text>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
              {/* Price */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Price
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    value={priceValue}
                    onChange={(value) => {
                      setPriceValue(value);
                      if (value === "paid") {
                        setFilteredCourses(
                          courses.filter((course) => course.price > 0)
                        );
                      }
                      if (value === "free") {
                        setFilteredCourses(
                          courses.filter((course) => course.price === 0)
                        );
                      }
                    }}
                  >
                    <Stack direction="column">
                      <Radio value="paid">
                        <Text
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          Paid
                        </Text>
                      </Radio>
                      <Radio value="free">
                        <Text
                          display={"flex"}
                          fontSize="sm"
                          alignItems={"center"}
                        >
                          Free
                        </Text>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const Star = ({ fillColor }) => {
  return (
    <svg
      style={{
        width: "0.8rem",
        height: "0.8rem",
        fill: fillColor,
        marginRight: "0.25rem",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};
export default FilterModal;
