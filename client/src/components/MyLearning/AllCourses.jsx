import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import CourseItemCard from "./CourseItemCard";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {user?.student?.courses?.length === 0 && (
        <Flex flexDir="column" alignItems="center" my="40">
          <Text fontWeight="600" fontSize="2xl">
            Start learning from over 210,000 courses today.
          </Text>
          <Text>
            When you purchase a course, it will appear here.
            <Link
              color="blue"
              onClick={() => {
                navigate("/courses/all");
              }}
            >
              {" "}
              Browse now.
            </Link>
          </Text>
        </Flex>
      )}
      {user?.student?.courses?.length > 0 && (
        <>
          <Flex w="100%" flexWrap="wrap" gap="20" px={{ lg: 10 }}>
            {user?.student?.courses?.map((course) => (
              <CourseItemCard courseId={course} key={course} />
            ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default AllCourses;
