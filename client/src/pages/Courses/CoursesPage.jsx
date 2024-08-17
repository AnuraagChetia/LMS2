import React from "react";
import Courses from "../../components/Course/Courses";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Flex } from "@chakra-ui/react";

const CoursesPage = () => {
  return (
    <>
      <Navbar />
      <Flex mx={{ lg: "10%" }}>
        <Courses />
      </Flex>
      <Footer />
    </>
  );
};

export default CoursesPage;
