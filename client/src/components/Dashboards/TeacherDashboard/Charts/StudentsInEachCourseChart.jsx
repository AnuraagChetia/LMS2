import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Flex } from "@chakra-ui/react";
const StudentsInEachCourseChart = ({ courses }) => {
  const [dataXaxis, setDataXaxis] = useState();
  const [dataYaxis, setDataYaxis] = useState();
  const barChartOptions = {
    title: {
      text: "Total Number of Students in Each Course",
      left: "center",
      textStyle: {
        fontSize: 12,
        whiteSpace: "wrap", // Prevent text from wrapping
        overflow: "hidden", // Hide overflowing text
        textOverflow: "ellipsis", // Display an ellipsis (...) when text overflows
      },
    },
    xAxis: {
      type: "category",
      data: dataXaxis,
    },
    yAxis: {
      type: "value",
      name: "Number of Students",
    },
    series: [
      {
        name: "Number of Students",
        type: "bar",
        data: dataYaxis,
        label: {
          show: true,
          position: "top", // Display labels on top of the bars
        },
      },
    ],
  };
  useEffect(() => {
    setDataXaxis(courses?.map((course) => course.title.slice(0, 20)));
    setDataYaxis(courses?.map((course) => course.studentsEnrolled.length));
  }, [courses]);
  return (
    <Flex
      w={{ base: "90%", xl: "40%", "2xl": "40%" }}
      border="1px solid gainsboro"
      alignItems="center"
      boxShadow="lg"
      m="4"
      p="3"
      bgColor="white"
    >
      <ReactECharts
        option={barChartOptions}
        style={{ height: "300px", width: "100%" }}
        echarts={echarts}
      />
    </Flex>
  );
};

export default StudentsInEachCourseChart;
