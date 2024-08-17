import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
  Avatar,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher } from "../../../store/userSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const AccountSettings = () => {
  const user = useSelector((state) => state.user);
  const [specialization, setSpecialization] = useState();
  const [bio, setBio] = useState();
  const [education, setEducation] = useState();
  const [experience, setExperience] = useState();

  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setSpecialization(user.teacher?.specialization);
    setBio(user.teacher?.bio);
    setEducation(user.teacher?.education);
    setExperience(user.teacher?.experience);
  }, [user]);

  const submitHandler = async () => {
    try {
      const payload = { specialization, bio, education, experience };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/update`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Instructor details updated successfully!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        //make changes in redux state
        dispatch(updateTeacher(data.teacher));
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
      console.log(error);
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      border="1px solid gainsboro"
      m={{ base: 0, md: 8 }}
      w="100%"
      flexDirection="column"
      h="fit-content"
    >
      {/* <AccountSettingsSidebar /> */}
      <Flex flexDirection="column" w="100%">
        <Flex
          w="100%"
          justifyContent="center"
          py="4"
          borderBottom="1px solid gainsboro"
          gap="2"
        >
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            bgColor="black"
            color="white"
            src={user.avatar}
            my="auto"
            ml={{ base: "2" }}
            size={{ base: "md", md: "xl" }}
          />
          <Flex
            flexDirection="column"
            alignItems="center"
            gap="1"
            mt={{ base: 0, md: "2" }}
          >
            <Text fontWeight="700" fontSize={{ base: "xl", md: "2xl" }}>
              Instructor profile
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Add information about yourself
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" p="4" gap="4">
          <Text>Instructor Settings</Text>
          <FormControl display="flex" flexDirection="column" gap="3">
            <Input
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
              }}
            />
            <Box mb="2">
              <CKEditor
                editor={ClassicEditor}
                data={bio}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setBio(data);
                }}
              />
              <FormHelperText>
                This is what will be shown in course page about you.
              </FormHelperText>
            </Box>
            <Input
              placeholder="Education"
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
              }}
            />
            <Input
              placeholder="Experience"
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
              }}
            />
          </FormControl>

          <Button
            w="fit-content"
            colorScheme="blackAlpha"
            bgColor="black"
            onClick={() => {
              submitHandler();
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountSettings;
