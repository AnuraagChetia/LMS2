import {
  AspectRatio,
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PhotoTab = () => {
  const user = useSelector((state) => state.user);
  const [photo, setPhoto] = useState(
    `${import.meta.env.VITE_BACKEND_URL}/avatars/${user.userName}/${
      user.userName
    }.jpeg`
  );
  const [file, setFile] = useState();
  const toast = useToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
    }
  };

  const changeAvatarHandler = async (e) => {
    try {
      e.preventDefault();
      const payload = new FormData();
      payload.append("name", "Avatar");
      payload.append("file", file);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/update-avatar`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Avatar updateed!",
          position: "top-right",
          status: "success",
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
    <Flex flexDirection="column" w="100%" px="4">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="1"
        mt="2"
        borderBottom="1px solid gainsboro"
      >
        <Text fontWeight="700" fontSize="2xl">
          Photo
        </Text>
        <Text textAlign='center'>Add a nice photo of yourself for your profile.</Text>
      </Flex>
      <form encType="multipart/form-data" onSubmit={changeAvatarHandler}>
        <Flex flexDirection="column" alignItems="center" gap="2">
          <Text>Image preview</Text>
          <Avatar src={photo} size="2xl" />
          <InputGroup>
            <Input
              type="file"
              placeholder="No file selected"
              p="1"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleImageChange(e);
              }}
            />
            <InputRightAddon display={{ base: "none", sm: "flex" }}>
              Upload image
            </InputRightAddon>
          </InputGroup>
        </Flex>
        <Button
          w="fit-content"
          colorScheme="blackAlpha"
          mt="2"
          bgColor="black"
          type="submit"
        >
          Save
        </Button>
      </form>
    </Flex>
  );
};

export default PhotoTab;
