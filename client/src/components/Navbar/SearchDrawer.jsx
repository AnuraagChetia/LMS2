import { Icon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CourseSearchCard from "./CourseSearchCard";
import axios from "axios";

const SearchDrawer = ({ allCourses }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [searchTerm, setSearchTerm] = useState();
  const [courses, setCourses] = useState();
  const [filteredCourses, setFilteredCourses] = useState();

  // Function to handle search bar input change.
  const searchhandler = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredItems);
  };
 

  useEffect(() => {
    setCourses(allCourses);
    setFilteredCourses(allCourses);
  }, [allCourses]);
  return (
    <>
      <Button
        ref={btnRef}
        bg={"none"}
        onClick={onOpen}
        display={{ lg: "none" }}
      >
        <Icon as={Search2Icon} boxSize={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody mt={0}>
            <InputGroup>
              <Input
                placeholder="Search course"
                value={searchTerm}
                size="lg"
                onChange={searchhandler}
              />
              <InputLeftElement pointerEvents="none">
                <Search2Icon mt={2} />
              </InputLeftElement>
              <InputRightElement>
                <DrawerCloseButton />
              </InputRightElement>
            </InputGroup>
            <Flex flexDir="column" gap="4" mt="4">
              {filteredCourses?.map((course) => (
                <CourseSearchCard course={course} key={course._id} onClose={onClose} />
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
