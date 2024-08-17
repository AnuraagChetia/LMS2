import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import JobApplicantItem from "./JobApplicantItem";
import { useSelector } from "react-redux";

const JobApplicants = () => {
  const user = useSelector((state) => state.user);
  const [jobApplicants, setJobApplicants] = useState([]);
  const { jobId } = useParams();
  // Fetch job applicants data from server.
  const getJobApplicants = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/career/job/get-applicants/${jobId}`,
        { headers: { Authorization: user.token } }
      );
      setJobApplicants(data.jobApplicants);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobApplicants();
  }, []);
  return (
    <Flex flexDir="column" w="100%">
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
          Candidates for {jobApplicants[0]?.job?.title}
        </Text>
        {jobApplicants?.map((applicant) => (
          <JobApplicantItem applicant={applicant} />
        ))}
      </Flex>
    </Flex>
  );
};

export default JobApplicants;
