import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Flex } from "@chakra-ui/react";
const TotalCoursesInEachCategory = ({ courses }) => {
  const [developmentCount, setDevelopmentCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [financeCount, setFinanceCount] = useState(0);
  const [itCount, setITCount] = useState(0);
  const [officeProductivityCount, setOfficeProductivityCount] = useState(0);
  const [personalDevelopmentCount, setPersonalDevelopmentCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);
  const [marketingCount, setMarketingCount] = useState(0);
  const [lifestyleCount, setLifestyleCount] = useState(0);
  const [photographyVideoCount, setPhotographyVideoCount] = useState(0);
  const [healthFitnessCount, setHealthFitnessCount] = useState(0);
  const [musicCount, setMusicCount] = useState(0);
  const [teachingAcademicsCount, setTeachingAcademicsCount] = useState(0);

  // Function to increment count based on category
  const incrementCountByCategory = (category) => {
    switch (category) {
      case "development":
        setDevelopmentCount((prevCount) => prevCount + 1);
        break;
      case "business":
        setBusinessCount((prevCount) => prevCount + 1);
        break;
      case "finance & acounting":
        setFinanceCount((prevCount) => prevCount + 1);
        break;
      case "it & software":
        setITCount((prevCount) => prevCount + 1);
        break;
      case "office productivity":
        setOfficeProductivityCount((prevCount) => prevCount + 1);
        break;
      case "personal development":
        setPersonalDevelopmentCount((prevCount) => prevCount + 1);
        break;
      case "design":
        setDesignCount((prevCount) => prevCount + 1);
        break;
      case "marketing":
        setMarketingCount((prevCount) => prevCount + 1);
        break;
      case "lifestyle":
        setLifestyleCount((prevCount) => prevCount + 1);
        break;
      case "photography & video":
        setPhotographyVideoCount((prevCount) => prevCount + 1);
        break;
      case "health & fitness":
        setHealthFitnessCount((prevCount) => prevCount + 1);
        break;
      case "music":
        setMusicCount((prevCount) => prevCount + 1);
        break;
      case "teaching & academics":
        setTeachingAcademicsCount((prevCount) => prevCount + 1);
        break;
      default:
      // Do nothing for unrecognized categories
    }
  };

  useEffect(() => {
    courses?.forEach((course) =>
      incrementCountByCategory(course.category.toLowerCase())
    );
  }, [courses]);
  const option = {
    title: {
      text: "Courses in each category", // Specify the title text here
      textStyle: {
        fontSize: 16, // You can adjust the font size if needed
      },
      left: "center", // Adjust the title position if needed
    },
    series: [
      {
        name: "Courses",
        type: "pie",
        radius: "60%",
        data: [
          ...(developmentCount !== 0
            ? [{ value: developmentCount, name: "Development" }]
            : []),
          ...(businessCount !== 0
            ? [{ value: businessCount, name: "Business" }]
            : []),
          ...(financeCount !== 0
            ? [{ value: financeCount, name: "Finance & Acounting" }]
            : []),
          ...(itCount !== 0 ? [{ value: itCount, name: "IT & Software" }] : []),
          ...(officeProductivityCount !== 0
            ? [{ value: officeProductivityCount, name: "Office Productivity" }]
            : []),
          ...(personalDevelopmentCount !== 0
            ? [
                {
                  value: personalDevelopmentCount,
                  name: "Personal Development",
                },
              ]
            : []),
          ...(designCount !== 0
            ? [{ value: designCount, name: "Design" }]
            : []),
          ...(marketingCount !== 0
            ? [{ value: marketingCount, name: "Marketing" }]
            : []),
          ...(lifestyleCount !== 0
            ? [{ value: lifestyleCount, name: "Lifestyle" }]
            : []),
          ...(photographyVideoCount !== 0
            ? [{ value: photographyVideoCount, name: "Photography & Video" }]
            : []),
          ...(healthFitnessCount !== 0
            ? [{ value: healthFitnessCount, name: "Health & Fitness" }]
            : []),
          ...(musicCount !== 0 ? [{ value: musicCount, name: "Music" }] : []),
          ...(teachingAcademicsCount !== 0
            ? [{ value: teachingAcademicsCount, name: "Teaching & Academics" }]
            : []),
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

export default TotalCoursesInEachCategory;
