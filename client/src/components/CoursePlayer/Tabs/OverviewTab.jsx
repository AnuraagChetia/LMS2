import { Avatar, Box, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OverviewTab = ({ course }) => {
  const user = useSelector((state) => state.user);
  const [numberOfLectures, setNumberOfLectures] = useState();
  const [courseDuration, setCourseDuration] = useState();
  const convertMinutesToHours = (minutes) => {
    if (isNaN(minutes)) {
      return "Invalid input. Please provide a valid number of minutes.";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} hours and ${remainingMinutes} minutes`;
  };
  useEffect(() => {
    setNumberOfLectures((prev) => {
      let numberOfLectures = 0;
      course?.modules.forEach((module) => {
        numberOfLectures += module.lectures.length;
      });

      return numberOfLectures;
    });
    setCourseDuration((prev) => {
      let numberOfMins = 0;
      course?.modules.forEach((module) => {
        module.lectures.forEach((lecture) => {
          numberOfMins += lecture.duration;
        });
      });
      return convertMinutesToHours(numberOfMins);
    });
  }, [course]);
  return (
    <Stack direction="column" divider={<StackDivider />} fontWeight="600">
      <Flex direction="column" gap="3">
        <Text fontSize="3xl">About this course</Text>
        <Text>{course?.headline}</Text>
      </Flex>
      <Flex direction={"row"} gap={{ base: 12 }}>
        <Text>By the numbers</Text>
        <Stack direction="column" m="0">
          <Text>
            {`Skill level:${
              course?.level?.charAt(0).toUpperCase() + course?.level?.slice(1)
            }`}
          </Text>
          <Text>Students: {course?.studentsEnrolled?.length}</Text>
          <Text>Languages: English</Text>
          <Text>Lectures: {numberOfLectures} </Text>
          <Text>Video: {courseDuration}</Text>
        </Stack>
      </Flex>
      <Flex direction={"row"} gap={{ base: 20 }}>
        <Text>Description</Text>
        <Text>{course?.description}</Text>
      </Flex>
      <Flex direction={"row"} gap={{ base: 24 }}>
        <Text w="70">Instructor</Text>
        <Stack direction="column" ml="0">
          <Flex>
            <Avatar
              name={`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
              bgColor="black"
              color="white"
              src={user.avatar}
            />
            <Box ml="3">
              <Text
                fontWeight="bold"
                fontStyle="italic"
              >{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</Text>
              <Text
                mt="4"
                dangerouslySetInnerHTML={{
                  __html: `${course?.instructor?.teacher?.bio}`,
                }}
              ></Text>
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default OverviewTab;
