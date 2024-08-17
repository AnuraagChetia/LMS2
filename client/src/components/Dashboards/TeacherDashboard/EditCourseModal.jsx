import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
const EditCourseModal = ({ course, reload }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [duration, setDuration] = useState(course.duration);
  const [level, setLevel] = useState(course.level);
  const [language, setLanguage] = useState(course.language);
  const [category, setCategory] = useState(course.category);
  const [tags, setTags] = useState(course.tags);
  const [file, setFile] = useState();

  const toast = useToast();

  //edit course details
  const editCourseHandler = async (e) => {
    try {
      e.preventDefault();
      const payload = new FormData();
      payload.append("title", title);
      payload.append("description", description);
      payload.append("price", price);
      payload.append("duration", duration);
      payload.append("level", level);
      payload.append("category", category);
      payload.append("tags", tags);
      payload.append("file", file);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/update-course/${
          course._id
        }`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Course details updated!.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      }
    } catch (error) {
      toast({
        title: "An Error Occured.",
        description: "Please fill up all the fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Text onClick={onOpen} w="100%">
        Edit
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Course Details</ModalHeader>
          <ModalCloseButton />
          <form encType="multipart/form-data" onSubmit={editCourseHandler}>
            <ModalBody>
              <FormControl>
                <FormLabel>Enter course title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <FormLabel>Enter description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <FormLabel>Enter price</FormLabel>
                <Input
                  type="text"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <FormLabel>Enter duration</FormLabel>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
                <FormLabel>Enter level</FormLabel>
                <Select
                  defaultValue={level}
                  variant="outline"
                  placeholder="Choose a level"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
                <FormLabel>Enter language</FormLabel>
                <Input
                  type="text"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                />
                <FormLabel>Enter category</FormLabel>
                <Select
                  variant="outline"
                  placeholder="Choose a category"
                  defaultValue={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="Development">Development</option>
                  <option value="Business">Business</option>
                  <option value="Finance & Acounting">
                    Finance & Accounting
                  </option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="Office Productivity">
                    Office Productivity
                  </option>
                  <option value="Personal Development">
                    Personal Development
                  </option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Photography Video">Photography Video</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Music">Music</option>
                  <option value="Teaching & Academics">
                    Teaching & Academics
                  </option>
                </Select>
                <FormLabel>Course thumbnail</FormLabel>
                <Input
                  type="file"
                  p="1"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <FormLabel>Enter tags</FormLabel>
                <Input
                  type="text"
                  placeholder="life,survival,cooking"
                  value={tags}
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                />
                <FormHelperText>Do not enter whitespaces</FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCourseModal;
