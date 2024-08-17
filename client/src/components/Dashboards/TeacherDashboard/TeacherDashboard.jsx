import React from "react";
import SideNav from "./SideNav";
import { Flex } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import CreateCourse from "./CreateCourse";
import ViewCourses from "./ViewCourses";
import { useParams } from "react-router-dom";
import CourseModule from "./CourseModule";
import EditModule from "./EditModule";
import EditLecture from "./EditLecture";
import MainTeacherDashboard from "./MainTeacherDashboard";
import AccountSettings from "./AccountSettings";

const TeacherDashboard = () => {
  const { tab, courseTitle, moduleTitle, lectureTitle } = useParams();
  return (
    <>
      <Flex h="100vh">
        <Flex
          display={{ base: "none", md: "flex" }}
          h="100vh"
          w="56"
          insetY="0"
          zIndex="50"
        >
          <SideNav />
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="start"
          py="2"
          boxShadow="sm"
          display={{ md: "none" }}
          h="100vh"
        >
          <SideDrawer />
        </Flex>
        {!tab && <MainTeacherDashboard />}
        {tab === "account-settings" && <AccountSettings />}
        {tab === "create-course" && (
          <Flex w="100%">
            <CreateCourse />
          </Flex>
        )}
        {tab == "view-course" && courseTitle === "all" && (
          <Flex w="100%">
            <ViewCourses />
          </Flex>
        )}
        {tab == "view-course" && courseTitle !== "all" && !moduleTitle && (
          <Flex w="100%">
            <CourseModule />
          </Flex>
        )}
        {moduleTitle && !lectureTitle && (
          <Flex w="100%">
            <EditModule />
          </Flex>
        )}
        {lectureTitle && (
          <Flex w="100%">
            <EditLecture />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default TeacherDashboard;
