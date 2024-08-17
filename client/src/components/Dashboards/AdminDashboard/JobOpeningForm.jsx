import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
const JobOpeningForm = ({ reload }) => {
  const user = useSelector((state) => state.user);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [department, setDepartment] = useState();
  const [employmentType, setEmploymentType] = useState();
  const [experienceLevel, setExperienceLevel] = useState();
  const [educationRequirements, setEducationRequirements] = useState();
  const [minimumRequirements, setMimumRequirements] = useState();
  const [prefferedRequirements, setPreferredRequirements] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [about, setAbout] = useState();
  const [skills, setSkills] = useState();
  const [benefits, setBenefits] = useState();

  const [additionalInformation, setAdditionalInformation] = useState();

  const submitHandler = async () => {
    try {
      const payload = {
        title,
        location,
        department,
        employmentType,
        experienceLevel,
        educationRequirements,
        minimumRequirements,
        prefferedRequirements,
        responsibilities,
        about,
        skills,
        benefits,
        additionalInformation,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/career/jobs/add`,
        payload,
        { headers: { Authorization: user.token } }
      );

      if (data.success) {
        toast({
          title: "Job opening created!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        reload();
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
    <>
      <Button onClick={onOpen}>Add New Job Opening</Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new job opening</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap="2">
              <Input
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />

              <Select
                variant="outline"
                placeholder="Choose Department"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                color="gray"
              >
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
                <option value="Product & Technology">
                  Product & Technology
                </option>
                <option value="Customer Experience">Customer Experience</option>
              </Select>

              <Select
                variant="outline"
                placeholder="Choose Employment Type"
                onChange={(e) => {
                  setEmploymentType(e.target.value);
                }}
                color="gray"
              >
                <option value="Full-time">Full-Time</option>
                <option value="Part-time">Part-Time</option>
                <option value="Intern">Intern</option>
              </Select>

              <Select
                variant="outline"
                placeholder="Choose Experience Level"
                onChange={(e) => {
                  setExperienceLevel(e.target.value);
                }}
                color="gray"
              >
                <option value="Entry-level">Entry level</option>
                <option value="Mid-level">Mid level</option>
                <option value="Senior-level">Senior level</option>
              </Select>

              <Input
                type="text"
                placeholder="Education Requirements"
                onChange={(e) => {
                  setEducationRequirements(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Responsibilities"
                onChange={(e) => {
                  let input = e.target.value.trim().split(",");
                  setResponsibilities(input);
                }}
              />
              <Input
                type="text"
                placeholder="Minimum Requirements"
                onChange={(e) => {
                  let input = e.target.value.trim().split(",");
                  setMimumRequirements(input);
                }}
              />
              <Input
                type="text"
                placeholder="Preffered Requirements"
                onChange={(e) => {
                  let input = e.target.value.trim().split(",");
                  setPreferredRequirements(input);
                }}
              />
              <Input
                type="text"
                placeholder="About"
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Skills"
                onChange={(e) => {
                  let input = e.target.value.trim().split(",");
                  setSkills(input);
                }}
              />
              <Input
                type="text"
                placeholder="Benefits"
                onChange={(e) => {
                  let input = e.target.value.trim().split(",");
                  setBenefits(input);
                }}
              />

              <Input
                type="text"
                placeholder="Additional Information"
                onChange={(e) => {
                  setAdditionalInformation(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                submitHandler();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobOpeningForm;
