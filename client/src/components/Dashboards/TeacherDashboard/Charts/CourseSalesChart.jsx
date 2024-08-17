import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const CourseSalesChart = ({ courses }) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState();

  useEffect(() => {
    setData(
      courses?.map((course) => {
        return { value: course.studentsEnrolled.length, name: course.title };
      })
    );
  }, [courses]);

  const option = {
    title: {
      text: "Total course sales", // Specify the title text here
      textStyle: {
        fontSize: 16, // You can adjust the font size if needed
      },
      left: "center", // Adjust the title position if needed
    },
    series: [
      {
        name: "Pie Chart",
        type: "pie",
        radius: "60%", // Adjust the radius of the pie chart if needed
        data: data,
        label: {
          show: true,
          formatter: function (params) {
            // Truncate the name if it is too long (e.g., keep first 10 characters)
            const truncatedName =
              params.name.length > 10
                ? params.name.slice(0, 20) + "..."
                : params.name;
            return `${truncatedName} : (${params.percent}%)`;
          },
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

export default CourseSalesChart;
