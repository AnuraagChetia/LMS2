import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CoursePlayer from "../../components/CoursePlayer/CoursePlayer";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CoursePlayerPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { courseId } = useParams();
  useEffect(() => {
    if (user.role !== "student") return;
    if (!user?.student?.courses.includes(courseId)) {
      navigate(`/course/${courseId}`);
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <CoursePlayer />
      <Footer />
    </>
  );
};

export default CoursePlayerPage;
