import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const UsersCountChart = ({ users }) => {
  const user = useSelector((state) => state.user);
  const [studentCount, setStudentCount] = useState();
  const [teacherCount, setTeacherCount] = useState();
  const [adminCount, setAdminCount] = useState();

  useEffect(() => {
    let students = 0;
    let teachers = 0;
    let admins = 0;
    users?.forEach((user) => {
      if (user.role === "student") {
        students += 1;
      }
      if (user.role === "teacher") {
        teachers += 1;
      }
      if (user.role === "admin") {
        admins += 1;
      }
    });
    setStudentCount(students);
    setTeacherCount(teachers);
    setAdminCount(admins);
  }, [users]);

  const option = {
    title: {
      text: "Total Students,Teachers and Admins", // Specify the title text here
      textStyle: {
        fontSize: 14, // You can adjust the font size if needed
      },
      left: "center", // Adjust the title position if needed
    },
    series: [
      {
        name: "People",
        type: "pie",
        radius: "60%",
        data: [
          { value: studentCount, name: "Students" },
          { value: teacherCount, name: "Teachers" },
          { value: adminCount, name: "Admins" },
        ],
        label: {
          show: true,
          formatter: "{b} : {c} ({d}%)",
        },
      },
    ],
  };
  return (
    <Flex
      w={{ base: "90%", xl: "40%", "2xl": "40%" }}
      alignItems="center"
      // h="fit-content"
      border="1px solid gainsboro"
      boxShadow="lg"
      m="4"
      p="3"
      bgColor="white"
    >
      <ReactECharts
        option={option}
        style={{ height: "200px", width: "100%" }}
        echarts={echarts}
      />
    </Flex>
  );
};

export default UsersCountChart;
