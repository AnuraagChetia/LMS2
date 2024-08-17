import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import image1 from "../../assets/Contact/contact1.png";
import { EmailIcon } from "@chakra-ui/icons";
import { Form } from "react-router-dom";
import axios from "axios";
const Contact = () => {
  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const openEmailClient = () => {
    // Change the email address as needed
    var email = "support@Brandon.LMS.in";

    // Create the mailto link
    var mailtoLink = "mailto:" + email;

    // Open the default email client
    window.location.href = mailtoLink;
  };
  const formSubmitHandler = async () => {
    try {
      const payload = { name, email, phone, subject, message };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/post-message`,
        payload
      );
      console.log(data);
      if (data.success) {
        toast({
          title: "Success",
          description: `Your Message has been sent Successfully!`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `Something went wrong!`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <Flex flexDir="column">
      <Flex
        justifyContent={{ base: "center" }}
        maxH={{ base: "20rem", xl: "28rem" }}
      >
        <Text
          display={{ base: "none", md: "flex" }}
          maxW={{ lg: "363px" }}
          fontWeight="bold"
          fontSize={{ base: "2.5rem" }}
          textAlign="left"
          alignSelf="center"
          ps="10"
          fontFamily="Playfair Display serif"
        >
          Get In Touch
        </Text>
        <Image
          w={{ base: "100%", md: "50%" }}
          src={image1}
          objectFit="contain"
          objectPosition={{ md: "right" }}
        />
      </Flex>
      <Flex justifyContent="center" mt="10">
        <Flex
          w={{ base: "80%", md: "90%", "2xl": "50%" }}
          boxShadow="dark-lg"
          flexDir={{ base: "column", md: "row" }}
        >
          <Flex flexDir="column" w="fit-content" p="10" gap="8" flex="1">
            <Text
              fontSize={{ base: "x-large", md: "xx-large" }}
              fontWeight="bold"
            >
              Send us a message <EmailIcon />
            </Text>
            <Form>
              <FormControl>
                <Flex flexDir="column" gap="4">
                  <Flex gap="10">
                    <Input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Input
                      type="email"
                      placeholder="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Flex>
                  <Flex gap="10">
                    <Input
                      type="number"
                      placeholder="Phone number"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="Subject"
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </Flex>
                  <Input
                    type="text"
                    placeholder="Message"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </Flex>
              </FormControl>
              <Button
                mt="6"
                onClick={() => {
                  formSubmitHandler();
                }}
              >
                Submit
              </Button>
            </Form>
          </Flex>
          <Flex
            bgColor="#a435f0"
            color="white"
            flexDir="column"
            alignItems="center"
            h={{ base: "20rem", md: "100%" }}
          >
            <Text fontSize="xx-large" fontWeight="bold" p="10">
              Contact Information
            </Text>
            <Button
              w="fit-content"
              bgColor="rgba(0, 0, 0, 0.5)"
              color="white"
              _hover={{ bgColor: "rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                openEmailClient();
              }}
            >
              support@Brandon.LMS.in
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contact;
