import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CareerHeader from "./CareerHeader";
import { Form, useParams } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import JobOpenings from "./JobOpenings";
import axios from "axios";
// Array of job openings
const DUMMY_JOB_OPENINGS = [
  // Job 1
  {
    id: 1,
    title: "Software Engineer",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    experienceLevel: "Mid-level",
    educationRequirements: "Bachelor's Degree in Computer Science",
    responsibilities: [
      "Develop and maintain software applications",
      "Collaborate with cross-functional teams",
      "Conduct code reviews",
    ],
    minimumRequirements: [
      "3+ years of software development experience",
      "Proficiency in JavaScript and Node.js",
      "Strong problem-solving skills",
    ],
    prefferedRequirements: [
      "Master's Degree in Computer Science",
      "Experience with cloud technologies",
    ],
    about:
      "Join our innovative tech team dedicated to building cutting-edge solutions for our clients.",
    skills: ["JavaScript", "Node.js", "React", "AWS"],
    benefits: ["Health insurance", "401(k) plan", "Flexible work hours"],
    applicationDeadline: new Date("2024-02-15"),
    howToApply: "Send your resume and cover letter to careers@example.com",
    additionalInformation:
      "We are an equal opportunity employer committed to diversity and inclusion.",
    department: "Product & Technology",
  },
  // Job 2
  {
    id: 2,
    title: "Marketing Specialist",
    location: "New York, NY",
    employmentType: "Part-time",
    experienceLevel: "Entry-level",
    educationRequirements: "Bachelor's Degree in Marketing or related field",
    responsibilities: [
      "Develop marketing campaigns",
      "Create engaging content for social media",
      "Analyze campaign performance",
    ],
    minimumRequirements: [
      "1+ year of marketing experience",
      "Excellent written and verbal communication skills",
      "Familiarity with social media platforms",
    ],
    prefferedRequirements: [
      "Certification in Digital Marketing",
      "Experience with SEO and SEM",
    ],
    about:
      "Join our dynamic marketing team and contribute to the success of our brand.",
    skills: [
      "Social media management",
      "Content creation",
      "Marketing analytics",
    ],
    benefits: ["Flexible work hours", "Professional development opportunities"],
    applicationDeadline: new Date("2024-02-20"),
    howToApply:
      "Submit your marketing portfolio and resume to marketingjobs@example.com",
    additionalInformation:
      "We value creativity and innovation in our marketing efforts.",
    department: "Marketing",
  },
  // Job 3
  {
    id: 3,
    title: "Operations Manager",
    location: "Chicago, IL",
    employmentType: "Full-time",
    experienceLevel: "Senior-level",
    educationRequirements:
      "Bachelor's Degree in Business Administration or related field",
    responsibilities: [
      "Oversee day-to-day operations",
      "Implement process improvements",
      "Manage team performance",
    ],
    minimumRequirements: [
      "5+ years of operations management experience",
      "Strong leadership and decision-making skills",
      "Excellent organizational abilities",
    ],
    prefferedRequirements: [
      "Master's Degree in Business Administration",
      "Experience with project management tools",
    ],
    about:
      "Lead our operations team and contribute to the efficiency of our organization.",
    skills: ["Operations management", "Leadership", "Project management"],
    benefits: ["Health insurance", "401(k) plan", "Generous vacation policy"],
    applicationDeadline: new Date("2024-02-25"),
    howToApply:
      "Submit your resume and cover letter to operationsjobs@example.com",
    additionalInformation:
      "We are looking for a results-driven and strategic operations leader.",
    department: "Operations",
  },
  // Job 4
  {
    id: 4,
    title: "UX/UI Designer",
    location: "Los Angeles, CA",
    employmentType: "Full-time",
    experienceLevel: "Mid-level",
    educationRequirements: "Bachelor's Degree in Design or related field",
    responsibilities: [
      "Create user-centric design solutions",
      "Collaborate with cross-functional teams",
      "Conduct user research and usability testing",
    ],
    minimumRequirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in design tools like Sketch or Figma",
      "Strong portfolio showcasing design projects",
    ],
    prefferedRequirements: [
      "Master's Degree in Design",
      "Experience with prototyping tools",
    ],
    about:
      "Join our design team and contribute to the user experience of our products.",
    skills: ["UI/UX design", "Prototyping", "User research"],
    benefits: [
      "Health insurance",
      "Flexible work hours",
      "Professional development opportunities",
    ],
    applicationDeadline: new Date("2024-03-01"),
    howToApply:
      "Submit your design portfolio and resume to designjobs@example.com",
    additionalInformation:
      "We value creativity and a user-centered approach in our design process.",
    department: "Product & Technology",
  },
  // Job 5
  {
    id: 5,
    title: "Sales Representative",
    location: "Houston, TX",
    employmentType: "Full-time",
    experienceLevel: "Entry-level",
    educationRequirements: "High school diploma or equivalent",
    responsibilities: [
      "Identify and pursue sales opportunities",
      "Build and maintain client relationships",
      "Achieve sales targets",
    ],
    minimumRequirements: [
      "1+ year of sales experience",
      "Excellent communication and interpersonal skills",
      "Goal-oriented mindset",
    ],
    prefferedRequirements: [
      "Bachelor's Degree in Business or related field",
      "Experience in B2B sales",
    ],
    about: "Join our sales team and contribute to the growth of our business.",
    skills: ["Sales", "Communication", "Negotiation"],
    benefits: [
      "Uncapped commission",
      "Health insurance",
      "Professional development opportunities",
    ],
    applicationDeadline: new Date("2024-03-05"),
    howToApply: "Submit your resume and cover letter to salesjobs@example.com",
    additionalInformation:
      "We are looking for motivated individuals passionate about sales.",
    department: "Sales",
  },
];
const Career = () => {
  const [jobOpenings, setjobOpenings] = useState([]);
  const [filteredJobOpenings, setFilteredJobOpenings] = useState([]);
  const { jobId } = useParams();
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/jobs`
      );
      setjobOpenings(data.jobs);
      setFilteredJobOpenings(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  const departmentChangeHandler = (e) => {
    setFilteredJobOpenings((prev) =>
      jobOpenings.filter(
        (job) =>
          job.category.toLocaleLowerCase() ===
          e.target.value.toLocaleLowerCase()
      )
    );
  };
  const workTypeChangeHandler = (e) => {
    setFilteredJobOpenings((prev) =>
      jobOpenings.filter(
        (job) =>
          job.employmentType.toLocaleLowerCase() ===
          e.target.value.toLocaleLowerCase()
      )
    );
  };
  const locationChangeHandler = (e) => {
    setFilteredJobOpenings((prev) =>
      jobOpenings.filter(
        (job) =>
          job.location.toLocaleLowerCase() ===
          e.target.value.toLocaleLowerCase()
      )
    );
  };
  const searchJobTitle = (e) => {
    setFilteredJobOpenings((prev) =>
      jobOpenings.filter((job) =>
        job.title
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      )
    );
  };
  return (
    <Flex flexDir="column">
      <CareerHeader />
      <Text
        display={{ md: "none" }}
        p="4"
        bgColor="#a435f0"
        fontWeight="600"
        textAlign="center"
        color="white"
        fontSize={{ xl: "larger" }}
      >
        Want to join us ? Check out our open positions !
      </Text>
      <Flex bg="gray.100" p="10">
        <Form style={{ width: "100%" }}>
          <FormControl>
            <Flex flexDir="column" alignItems="center" gap="4">
              <Text
                alignSelf="normal"
                ms={{ base: 2 }}
                fontWeight={{ base: "bold" }}
              >
                Openings:
              </Text>
              <Flex
                w="100%"
                gap="4"
                flexDir={{ base: "column", md: "row" }}
                alignItems={{ base: "center" }}
              >
                <Select
                  variant="outline"
                  placeholder="Choose Department"
                  bg="white"
                  onChange={departmentChangeHandler}
                >
                  <option value="customer experience">
                    Customer Experience
                  </option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="product & technology">
                    Product & Technology
                  </option>
                  <option value="sales">Sales</option>
                </Select>
                <Select
                  variant="outline"
                  placeholder="Choose Work Type"
                  bg="white"
                  onChange={workTypeChangeHandler}
                >
                  <option value="full-time">Full time</option>
                  <option value="part-time">Part time</option>
                  <option value="intern">Intern </option>
                </Select>
                <Select
                  variant="outline"
                  placeholder="Choose Location"
                  bg="white"
                  onChange={locationChangeHandler}
                >
                  <option value="bengaluru">Bengaluru, India</option>
                  <option value="remote">Remote</option>
                </Select>
              </Flex>
              <InputGroup>
                <InputLeftElement>
                  <Search2Icon />
                </InputLeftElement>
                <Input
                  placeholder="Search Job Title"
                  type="text"
                  bg="white"
                  onChange={searchJobTitle}
                />
              </InputGroup>
            </Flex>
          </FormControl>
        </Form>
      </Flex>
      {jobOpenings.length === 0 && (
        <Text
          p={{ base: 40 }}
          fontStyle="italic"
          fontWeight="600"
          textAlign="center"
          color="grey"
        >
          No current job openings
        </Text>
      )}
      {jobOpenings.length > 0 && (
        <JobOpenings jobOpenings={filteredJobOpenings} />
      )}
    </Flex>
  );
};

export default Career;
