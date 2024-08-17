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
} from "@chakra-ui/react";
import axios from "axios";
import userSlice, { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = ({ changeState }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //navigate
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  //toast
  const toast = useToast();

  //show password
  const handleClick = () => setShow(!show);

  //form submit handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    //validateon
    if (!email || !password) {
      return toast({
        title: "An Error Occured.",
        description: "Please fill up all the fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        { email: email, password: password }
      );

      //set user redux
      dispatch(setUser({ ...data }));
      //if user is student navigate to home page
      if (data.role === "student") navigate("/");
      //if user is teacher navigate to teacher dashboard
      if (data.role === "teacher") navigate("/dashboard/teacher");
      //if user is admin navigate to admin dashboard
      if (data.role === "admin") navigate("/dashboard/admin");


      return toast({
        title: "Log in successfull",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "An Error Occured.",
        position: "top-right",

        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
            onSubmit={formSubmitHandler}
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
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={show ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue("gray.300", "gray.700")}
                      _hover={{
                        bg: useColorModeValue("gray.400", "gray.800"),
                      }}
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: "md", sm: "md" }} onClick={()=>{navigate('/user/forget-password')}}>
                  Forgot password?
                </Link>
              </Stack>
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
                Sign in
              </Button>
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                rounded="md"
                w="100%"
                onClick={() => {
                  // changeState("signup");
                  navigate("/user/signup");
                }}
              >
                Create an account
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default Login;
