import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileTab = () => {
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");

  const toast = useToast();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setHeadline(user.headline || "");
    setWebsite(user.website || "");
    setTwitter(user.twitter || "");
    setFacebook(user.facebook || "");
    setLinkedin(user.linkedin || "");
    setYoutube(user.youtube || "");
  }, [user]);

  const submitHandler = async () => {
    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        headline: headline,
        website: website,
        twitter: twitter,
        facebook: facebook,
        linkedin: linkedin,
        youtube: youtube,
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/update-profile`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: data.message,
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
    <Flex flexDirection="column" w="100%">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="1"
        mt="2"
        borderBottom="1px solid gainsboro"
      >
        <Text fontWeight="700" fontSize="2xl">
          Public profile
        </Text>
        <Text>Add information about yourself</Text>
      </Flex>
      <Flex flexDirection="column" p="4" gap="4">
        <Text>Basis</Text>
        <FormControl display="flex" flexDirection="column" gap="3">
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Box>
            <Input
              value={headline}
              placeholder="Headline"
              onChange={(e) => {
                setHeadline(e.target.value);
              }}
            />
            <FormHelperText mt="0">
              Add a professional headline like, "Instructor at LMS" or
              "Architect"
            </FormHelperText>
          </Box>
        </FormControl>
        <Text>Links:</Text>
        <FormControl display="flex" flexDirection="column" gap="4">
          <Input
            value={website}
            placeholder="Website(http(s)://.."
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
          <Box>
            <InputGroup>
              <InputLeftAddon display={{ base: "none", sm: "flex" }}>
                http://twitter.com/
              </InputLeftAddon>
              <Input
                placeholder={"Twitter Profile"}
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
              />
            </InputGroup>
            <FormHelperText mt="0">
              Add your Twitter username (e.g. johnsmith).
            </FormHelperText>
          </Box>

          <Box>
            <InputGroup>
              <InputLeftAddon display={{ base: "none", sm: "flex" }}>
                http://facebook.com/
              </InputLeftAddon>
              <Input
                placeholder={"Facebook Profile"}
                value={facebook}
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
              />
            </InputGroup>
            <FormHelperText mt="0">
              Add your Facebook username (e.g. johnsmith).
            </FormHelperText>
          </Box>

          <Box>
            <InputGroup>
              <InputLeftAddon display={{ base: "none", sm: "flex" }}>
                http://linkedin.com/
              </InputLeftAddon>
              <Input
                placeholder={"Linkedin Profile"}
                value={linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                }}
              />
            </InputGroup>
            <FormHelperText mt="0">
              Add your linkedin username (e.g. in/johnsmith).
            </FormHelperText>
          </Box>

          <Box>
            <InputGroup>
              <InputLeftAddon display={{ base: "none", sm: "flex" }}>
                http://youtube.com/
              </InputLeftAddon>
              <Input
                placeholder={"Youtube Profile"}
                value={youtube}
                onChange={(e) => {
                  setYoutube(e.target.value);
                }}
              />
            </InputGroup>
            <FormHelperText mt="0">
              Add your Youtube username (e.g. johnsmith).
            </FormHelperText>
          </Box>
        </FormControl>
        <Button
          onClick={() => {
            submitHandler();
          }}
          w="fit-content"
          colorScheme="blackAlpha"
          bgColor="black"
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileTab;
