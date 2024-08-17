import { ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobListItem = ({ job }) => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDir={{ base: "column" }}
      _hover={{ bgColor: "gray.100" }}
      p="4"
      cursor="pointer"
      onClick={() => {
        navigate(`/career/${job._id}`);
      }}
    >
      <Flex flexDir={{ base: "column" }} gap="4" mb="4">
        <Text fontWeight="bold" fontSize="20">
          {job.title}
        </Text>
        <Text>{job.about}</Text>
      </Flex>
      <hr />
      <Flex
        flexDir={{ base: "row" }}
        mt="4"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir={{ base: "column" }}>
          <Text>{job.location}</Text>
          <Text>{job.type}</Text>
        </Flex>
        <ChevronRightIcon boxSize="10" />
      </Flex>
    </Flex>
  );
};

export default JobListItem;
