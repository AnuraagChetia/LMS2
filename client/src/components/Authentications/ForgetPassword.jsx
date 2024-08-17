import { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  useToast,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import userSlice, { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ({ changeState }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();

  //toast
  const toast = useToast();

  //forget password handler
  const forgetPasswordHandler = async () => {
    //validateon
    if (!email) {
      return toast({
        title: "An Error Occured.",
        description: "Please provide your email!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/forget-password`,
        { email: email }
      );
      if (data.success) {
        toast({
          title: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An Error Occured.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Container maxW="100" p={{ base: 5, md: 10 }}>
      <Center>
        <Flex spacing={4} flexDir="column">
          <Flex>
            <Heading fontSize="2xl" textAlign="center">
              Enter email address of your account
            </Heading>
          </Flex>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  rounded="md"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                rounded="md"
                w="100%"
                onClick={() => {
                  forgetPasswordHandler();
                }}
              >
                Send reset link
              </Button>
            </VStack>
          </VStack>
        </Flex>
      </Center>
    </Container>
  );
};

export default ForgetPassword;
