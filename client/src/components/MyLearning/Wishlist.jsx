import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import CourseItemCard from "./CourseItemCard";
import { useNavigate } from "react-router-dom";
const Wishlist = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      {user?.student?.wishlist?.length === 0 && (
        <Flex flexDir="column" alignItems="center" my="130">
          <Text my="2" fontStyle="italic">
            Nothing in wishlist
          </Text>
          <Button
            bgColor="black"
            colorScheme="blackAlpha"
            textColor="white"
            onClick={() => {
              navigate("/courses/all");
            }}
          >
            Browse courses now
          </Button>
        </Flex>
      )}
      {user?.student?.wishlist?.length > 0 && (
        <>
          <Flex w="100%" flexWrap="wrap" gap="20">
            {user?.student?.wishlist?.map((course) => (
              <CourseItemCard courseId={course} key={course} wishlist={true} />
            ))}
          </Flex>
        </>
      )}
    </>
  );
};

export default Wishlist;
