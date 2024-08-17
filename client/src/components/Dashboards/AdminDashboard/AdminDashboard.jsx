import { Flex } from "@chakra-ui/react";
import React from "react";
import AdminSideNav from "./AdminSideNav";
import AdminSideDrawer from "./AdminSideDrawer";
import { useParams } from "react-router-dom";
import JobBoard from "./JobBoard";
import Courses from "./Courses";
import Users from "./Users";
import Coupons from "./Coupons";
import SingleJobDetail from "./SingleJobDetail";
import MainDashboard from "./MainDashboard";
import JobApplicants from "./JobApplicants";
import Orders from "./Orders";
import Messages from "./Messages";
import Affiliates from "./Affiliates";
const AdminDashboard = () => {
  const { tab, subTab, jobId } = useParams();
  return (
    <Flex h="100vh" w="100%">
      <Flex
        display={{ base: "none", md: "flex" }}
        h="100vh"
        w="56"
        insetY="0"
        zIndex="50"
      >
        <AdminSideNav />
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="start"
        py="2"
        boxShadow="sm"
        display={{ md: "none" }}
      >
        <AdminSideDrawer />
      </Flex>
      {!tab && <MainDashboard />}
      {tab === "job-board" && !jobId && !subTab && <JobBoard />}
      {tab === "job-board" && !jobId && subTab && <SingleJobDetail />}
      {tab === "courses" && !jobId && <Courses />}
      {tab === "users" && !jobId && <Users />}
      {tab === "coupons" && !jobId && <Coupons />}
      {tab === "orders" && !jobId && <Orders />}
      {tab === "messages" && !jobId && <Messages />}
      {tab === "affiliates" && !jobId && <Affiliates />}
      {tab === "job-board" && subTab === "job-applicants" && jobId && (
        <JobApplicants />
      )}
    </Flex>
  );
};

export default AdminDashboard;
