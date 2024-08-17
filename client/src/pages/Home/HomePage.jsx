import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TopCategory from "../../components/TopCategory/TopCategory";
import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import Testimonial from "../../components/Testimonial/Testimonial";
import BrowserCourse from "../../components/BrowserCourse/BrowserCourse";
import { Box } from "@chakra-ui/react";
import axios from "axios";
const HomePage = () => {
  const [courses, setCourses] = useState([]);

  const getFeaturedCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/all`
      );
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeaturedCourses();
  }, []);
  return (
    <>
      <Box maxW="100%">
        <Header />
      </Box>
      <TopCategory />
      <Featured coursess={courses} />
      <BrowserCourse />
      <Testimonial />
      <Footer />
    </>
  );
};

export default HomePage;
