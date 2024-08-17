import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  OrderedList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// const job = {
//   id: 1,
//   title: "Software Engineer",
//   location: "San Francisco, CA",
//   employmentType: "Full-time",
//   experienceLevel: "Mid-level",
//   educationRequirements: "Bachelor's Degree in Computer Science",
//   responsibilities: [
//     "Develop and maintain software applications",
//     "Collaborate with cross-functional teams",
//     "Conduct code reviews",
//   ],
//   minimumRequirements: [
//     "3+ years of software development experience",
//     "Proficiency in JavaScript and Node.js",
//     "Strong problem-solving skills",
//   ],
//   prefferedRequirements: [
//     "Master's Degree in Computer Science",
//     "Experience with cloud technologies",
//   ],
//   about:
//     "Join our innovative tech team dedicated to building cutting-edge solutions for our clients.",
//   skills: ["JavaScript", "Node.js", "React", "AWS"],
//   benefits: ["Health insurance", "401(k) plan", "Flexible work hours"],
//   applicationDeadline: new Date("2024-02-15"),
//   howToApply: "Send your resume and cover letter to careers@example.com",
//   additionalInformation:
//     "We are an equal opportunity employer committed to diversity and inclusion.",
//   department: "Product & Technology",
// };
const SingleJobOpening = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [job, setJob] = useState();
  const { jobId } = useParams();

  //candidate details
  const [resume, setResume] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [currentCTC, setCurrentCTC] = useState();
  const [expectedCTC, setExpectedCTC] = useState();

  //form submit handler
  const formSubmitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("job", jobId);
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("currentCTC", currentCTC);
      formData.append("expectedCTC", expectedCTC);
      formData.append("file", resume);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/job/submit-application`,
        formData
      );
      toast({
        title: "Your application has been submitted !",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong !",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //get job details handler
  const getJob = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/job/${jobId}`
      );
      setJob(data.job);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJob();
  }, []);
  return (
    <Flex flexDir="column">
      <Flex
        flexDir={{ base: "column", md: "row" }}
        bgColor="#6a5376"
        color="white"
        w="100%"
        justifyContent="space-between"
        p={{ base: 10 }}
        px={{ xl: 40 }}
      >
        <Flex flexDir="column" gap="4">
          <Text
            cursor="pointer"
            onClick={() => {
              navigate("/career");
            }}
            fontSize="18px"
            display="flex"
            alignItems="center"
          >
            <ArrowBackIcon mr="1" />
            {job?.department}
          </Text>
          <Flex flexDir="column">
            <Text
              fontSize="32px"
              fontWeight="600"
              w={{ base: "66%", md: "100%" }}
            >
              {job?.title}
            </Text>
            <Text>{job?.experienceLevel}</Text>
            <Text>{job?.location}</Text>
            <Text>Work Type: {job?.employmentType}</Text>
          </Flex>
        </Flex>
        <Button
          mt={{ base: 4 }}
          bgColor="rgb(49, 222, 195)"
          _hover={{ bgColor: "rgb(49, 222, 195,0.5)" }}
          w="fit-content"
          onClick={() => {
            document
              .querySelector(`form`)
              .scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          Apply Now
        </Button>
      </Flex>
      <Flex flexDir="column" p={{ base: 8, md: 20 }} px={{ xl: 40 }} gap="4">
        <Text fontWeight="600">About LMS :</Text>
        <Text fontSize="14">
          DrinkPrime is a subscription-based drinking water solution that began
          as a response to the unreliable supply of safe drinking water across
          Urban India. Over time we have evolved into an organization that is
          driven by a singular mission, to change the way people think about the
          water they drink. Through our subscription-based model, we provide
          customers with water purifiers that use integrated technology to help
          them monitor the quality of the water they consume every day. At
          DrinkPrime, we are on a mission to make safe drinking water accessible
          and affordable to every resident in India. We are backed by Tier 1 VCs
          and many prominent angels. They believe in the vision, mission and the
          team of DrinkPrime. With our tech first approach, we are taking up
          this audacious mission and believe in solving it. Be a part of history
          and join us. We can solve this problem together.
        </Text>
        <Text fontWeight="600">Your Role :</Text>
        <Text fontSize="14">{job?.about}</Text>
        <Text fontWeight="600">Key Responsibilities :</Text>
        <Text fontSize="14">
          <OrderedList>
            {job?.responsibilities?.map((responsility) => (
              <ListItem>{responsility}</ListItem>
            ))}
          </OrderedList>
        </Text>
        <Text fontWeight="600">Educational requirements :</Text>
        <Text fontSize="14">{job?.educationRequirements}</Text>
        <Text fontWeight="600">Minimum Requirements :</Text>
        <Text fontSize="14">
          <OrderedList>
            {job?.minimumRequirements?.map((minimumRequirement) => (
              <ListItem>{minimumRequirement}</ListItem>
            ))}
          </OrderedList>
        </Text>
        <Text fontWeight="600">Preffered Requirements :</Text>
        <Text fontSize="14">
          <OrderedList>
            {job?.prefferedRequirements?.map((prefferedRequirement) => (
              <ListItem>{prefferedRequirement}</ListItem>
            ))}
          </OrderedList>
        </Text>
        <Text fontWeight="600">Skills Required :</Text>
        <Text fontSize="14">
          <OrderedList>
            {job?.skills?.map((skill) => (
              <ListItem>{skill}</ListItem>
            ))}
          </OrderedList>
        </Text>
        <Text fontWeight="600">Benifits :</Text>
        <Text fontSize="14">
          <OrderedList>
            {job?.benefits?.map((benifit) => (
              <ListItem>{benifit}</ListItem>
            ))}
          </OrderedList>
        </Text>
        <Text fontWeight="600">Additional Information :</Text>
        <Text fontSize="14">
          <Text>{job?.additionalInformation}</Text>
        </Text>
      </Flex>
      {/* job description end here */}
      <Flex p={{ base: 10, md: 20 }} px={{ xl: 40 }}>
        <Form
          style={{ width: "100%" }}
          id="form"
          encType="multipart/form-data"
          onSubmit={formSubmitHandler}
        >
          <Text color="#7b40a0" fontSize="22" mb="4">
            Submit Your Application
          </Text>
          <FormControl isRequired>
            <FormLabel>Upload your resume</FormLabel>
            <Input
              type="file"
              p="1"
              onChange={(e) => {
                setResume(e.target.files[0]);
              }}
            />
          </FormControl>
          <Flex flexDir={{ base: "column", md: "row" }} gap="4">
            <FormControl isRequired>
              <FormLabel fontSize="14">First name:</FormLabel>
              <Input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="14">Middle Name:</FormLabel>
              <Input
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="14">Last name:</FormLabel>
              <Input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <FormLabel fontSize="14">Email:</FormLabel>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="14">Mobile:</FormLabel>
            <Input
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="14">Current CTC:</FormLabel>
            <Input
              onChange={(e) => {
                setCurrentCTC(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="14">Expected CTC:</FormLabel>
            <Input
              onChange={(e) => {
                setExpectedCTC(e.target.value);
              }}
            />
          </FormControl>
          <Button
            mt="4"
            bgColor="rgb(49, 222, 195)"
            _hover={{ bgColor: "rgb(49, 222, 195,0.5)" }}
            w="fit-content"
            type="submit"
          >
            Submit Application
          </Button>
        </Form>
      </Flex>
    </Flex>
  );
};

export default SingleJobOpening;
