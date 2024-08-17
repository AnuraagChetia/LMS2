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
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ changeState }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState("student");

  //toast
  const toast = useToast();

  //navigate
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    //validate data
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !role
    ) {
      console.log(username);
      return toast({
        title: "An Error Occured.",
        description: "Please fill up all the fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    //match both passwords
    if (password !== confirmPassword) {
      return toast({
        title: "An Error Occured.",
        description: "Passwords do not match !!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    try {
      const userData = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        role: role,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        userData
      );
      if (data.success) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("eror");
    }
  };

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign up</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            onSubmit={formSubmitHandler}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              {/* username */}
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </FormControl>
              {/* email */}
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  rounded="md"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </FormControl>
              {/* password */}
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </InputGroup>
              </FormControl>
              {/* confirm password */}
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
                  />
                </InputGroup>
              </FormControl>
              {/* first name */}
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </FormControl>
              {/* last name */}
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
              </FormControl>
              {/* phone number */}
              <FormControl id="phoneNumber">
                <FormLabel>Phone Number</FormLabel>
                <Input
                  rounded="md"
                  type="tel"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  required
                />
              </FormControl>
              {/* role */}
              <FormControl id="role">
                <FormLabel>Select Role</FormLabel>
                <RadioGroup onChange={setRole} defaultValue="student">
                  {/* <Stack direction="row"> */}
                  <Radio value="student">Student</Radio>
                  <Radio value="teacher">Teacher</Radio>
                  {/* </Stack> */}
                </RadioGroup>
              </FormControl>
            </VStack>
            {/* signup button */}
            <VStack w="100%">
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: "green.500",
                }}
                rounded="md"
                w="100%"
                type="submit"
              >
                Sign Up
              </Button>
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                rounded="md"
                w="100%"
                type="button"
                onClick={() => {
                  // changeState("login");
                  navigate("/user/login");
                }}
              >
                Have an account? Login
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default Signup;
