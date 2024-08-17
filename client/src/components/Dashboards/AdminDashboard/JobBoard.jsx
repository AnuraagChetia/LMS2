import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import JobOpeningForm from "./JobOpeningForm";
import axios from "axios";

const JobBoard = () => {
  const [jobs, setjobs] = useState();
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/jobs`
      );
      setjobs(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <Flex w="100%">
      <Flex
        flexDirection="column"
        w="100%"
        justifyContent="start"
        alignItems="center"
        gap="6"
        mt="2"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="600"
          w="100%"
          py="5"
          borderBottom="1px solid gainsboro"
        >
          Job Board
        </Text>
        <JobOpeningForm reload={getAllJobs} />
        {jobs?.map((job) => (
          <JobItem job={job} />
        ))}
        {jobs?.length === 0 && <Text>No jobs available</Text>}
      </Flex>
    </Flex>
  );
};

export default JobBoard;
