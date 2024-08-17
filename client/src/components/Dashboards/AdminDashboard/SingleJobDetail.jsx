import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SingleJobDetail = () => {
  const user = useSelector((state) => state.user);
  const { subTab } = useParams();
  const [job, setJob] = useState();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [employmentType, setEmploymentType] = useState();
  const [experienceLevel, setExperienceLevel] = useState();
  const [educationRequirements, setEducationRequirements] = useState();
  const [minimumRequirements, setMimumRequirements] = useState();
  const [prefferedRequirements, setPreferredRequirements] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [about, setAbout] = useState();
  const [skills, setSkills] = useState();
  const [benefits, setBenefits] = useState();
  const [applicationDeadline, setApplicationDeadline] = useState();
  const [howToApply, setHowToApply] = useState();
  const [additionalInformation, setAdditionalInformation] = useState();

  const toast = useToast();
  const navigate = useNavigate();

  const getAllJobs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/jobs`
      );
      const desiredJob = data.jobs.find((job) => job.title === subTab);
      setJob(desiredJob);
      setTitle(desiredJob.title);
      setLocation(desiredJob.location);
      setEmploymentType(desiredJob.employmentType);
      setExperienceLevel(desiredJob.experienceLevel);
      setEducationRequirements(desiredJob.educationRequirements);
      setMimumRequirements(desiredJob.minimumRequirements);
      setPreferredRequirements(desiredJob.prefferedRequirements);
      setResponsibilities(desiredJob.responsibilities);
      setAbout(desiredJob.about);
      setSkills(desiredJob.skills);
      setBenefits(desiredJob.benefits);
      setApplicationDeadline(desiredJob.applicationDeadline);
      setHowToApply(desiredJob.howToApply);
      setAdditionalInformation(desiredJob.additionalInformation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const deletejobHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/jobs/delete/${
          job._id
        }`,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Job opening deleted!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard/admin/job-board");
      } else {
        toast({
          title: "Something went wrong!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const updateJobDetails = async () => {
    try {
      const payload = {
        title,
        location,
        employmentType,
        experienceLevel,
        educationRequirements,
        minimumRequirements,
        prefferedRequirements,
        responsibilities,
        about,
        skills,
        benefits,
        applicationDeadline,
        howToApply,
        additionalInformation,
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/jobs/update/${
          job._id
        }`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Job opening updated!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went wrong!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <Flex w="100%" justifyContent="center" h="fit-content" pb={{base:8}}>
      <Flex
        h="fit-content"
        w={{ md: "60vw" }}
        border="1px solid gainsboro"
        borderRadius="10"
        p="4"
        my="10"
        flexDirection="column"
      >
        <Text
          fontSize="30"
          py="2"
          mb="2"
          fontWeight="600"
          borderBottom="1px solid gainsboro"
        >
          {job?.title}
        </Text>
        <FormControl>
          <FormLabel>Job title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <FormLabel>Employment Type</FormLabel>
          <Input
            type="text"
            value={employmentType}
            onChange={(e) => {
              setEmploymentType(e.target.value);
            }}
          />
          <FormLabel>Experience Level</FormLabel>
          <Input
            type="text"
            value={experienceLevel}
            onChange={(e) => {
              setExperienceLevel(e.target.value);
            }}
          />
          <FormLabel>Educational Requirements</FormLabel>
          <Input
            type="text"
            value={educationRequirements}
            onChange={(e) => {
              setEducationRequirements(e.target.value);
            }}
          />
          <FormLabel>Responsibilities</FormLabel>
          <Input
            type="text"
            value={responsibilities}
            onChange={(e) => {
              let input = e.target.value.trim().split(",");
              setResponsibilities(input);
            }}
          />
          <FormLabel>Minimum Requirements</FormLabel>
          <Input
            type="text"
            value={minimumRequirements}
            onChange={(e) => {
              let input = e.target.value.trim().split(",");
              setMimumRequirements(input);
            }}
          />
          <FormLabel>Preffered Requirements</FormLabel>
          <Input
            type="text"
            value={prefferedRequirements}
            onChange={(e) => {
              let input = e.target.value.trim().split(",");
              setPreferredRequirements(input);
            }}
          />
          <FormLabel>About</FormLabel>
          <Input
            type="text"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          <FormLabel>Skills</FormLabel>
          <Input
            type="text"
            value={skills}
            onChange={(e) => {
              let input = e.target.value.trim().split(",");
              setSkills(input);
            }}
          />
          <FormLabel>Benefits</FormLabel>
          <Input
            type="text"
            value={benefits}
            onChange={(e) => {
              let input = e.target.value.trim().split(",");
              setBenefits(input);
            }}
          />
          <FormLabel>Application Deadline</FormLabel>
          <Input
            type="text"
            value={applicationDeadline}
            onChange={(e) => {
              setApplicationDeadline(e.target.value);
            }}
          />
          <FormLabel>How to Apply</FormLabel>
          <Input
            type="text"
            value={howToApply}
            onChange={(e) => {
              setHowToApply(e.target.value);
            }}
          />
          <FormLabel>Additional Information</FormLabel>
          <Input
            type="text"
            value={additionalInformation}
            onChange={(e) => {
              setAdditionalInformation(e.target.value);
            }}
          />
        </FormControl>

        <Flex w="100%" gap="4">
          <Button mt="2" colorScheme="red" w="100%" onClick={deletejobHandler}>
            Delete
          </Button>
          <Button mt="2" colorScheme="blue" w="100%" onClick={updateJobDetails}>
            Update
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleJobDetail;
