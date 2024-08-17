import {
  AspectRatio,
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OverviewTab from "./Tabs/OverviewTab";
import QnATab from "./Tabs/QnATab";
import ReviewsTab from "./Tabs/ReviewsTab";
import CourseContents from "./CourseContents";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useVideo } from "react-use";
import CourseContentsTab from "./Tabs/CourseContentsTab";

const CoursePlayer = () => {
  const [course, setCourse] = useState();
  const [videoUrl, setVideoUrl] = useState();

  const { courseId } = useParams();

  const getCourse = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`
      );
      setCourse(data.course);

      //for production

      setVideoUrl(
        `${import.meta.env.VITE_BACKEND_URL}/course/get-lecture/${
          data.course?.modules[0]?._id
        }/${data.course?.modules[0]?.lectures[0]._id}`
      );

      // for demo

      // setVideoUrl(
      //   "https://www.youtube.com/embed/37E9ckMDdTk?si=ZmOUPD0vHecTxflh"
      // );
    } catch (error) {
      console.log(error);
    }
  };

  const changeLecture = (videoUrl) => {
    setVideoUrl(videoUrl);
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <Grid
      templateAreas={`"header header" "nav main" "nav footer"`}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={"nav"} display={{ base: "none", md: "block" }}>
        <CourseContents
          modules={course?.modules}
          changeLecture={changeLecture}
        />
      </GridItem>
      <GridItem py="2" area={"main"} width={{ base: "95vw", md: "100%" }}>
        <AspectRatio
          maxW={{ base: "90%", md: "70%" }}
          ratio={4 / 3}
          mx="auto"
          my="2"
        >
          {/* for production */}
          <iframe src={videoUrl} title="lecture" allowFullScreen />
          {/* for demo */}
          {/* <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
        </AspectRatio>

        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Q&A</Tab>
            <Tab>Reviews</Tab>
            <Tab display={{ md: "none" }}>Course contents</Tab>
          </TabList>

          <TabPanels>
            <TabPanel w={{ md: "65vw", xl: "80vw" }}>
              <OverviewTab course={course} />
            </TabPanel>
            <TabPanel w={{ md: "65vw", xl: "80vw" }}>
              <QnATab course={course} reload={getCourse} />
            </TabPanel>
            <TabPanel w={{ md: "65vw", xl: "80vw" }}>
              <ReviewsTab />
            </TabPanel>
            <TabPanel>
              <CourseContentsTab
                modules={course?.modules}
                changeLecture={changeLecture}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
  );
};

export default CoursePlayer;
