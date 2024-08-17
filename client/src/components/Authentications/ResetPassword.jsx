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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  //toast
  const toast = useToast();

  const navigate = useNavigate();

  const { resetId } = useParams();

  //show password
  const handleClick = () => setShow(!show);

  //reset password handler
  const resetPasswordHandler = async () => {
    try {
      if (password !== confirmPassword) {
        toast({
          title: "Passwords do not match.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/change-password/${resetId}`,
        { password: password }
      );
      if (data.success) {
        navigate("/user/login");
        toast({
          title: data.message,
          description: "Please sign in with new password",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An Error Occured.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Reset your password</Heading>
          </Stack>
          <VStack
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              <FormControl>
                <FormLabel>Enter new password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={show ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </InputGroup>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    rounded="md"
                    type={show ? "text" : "password"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
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
              <Button
                bg="blue.300"
                color="white"
                _hover={{
                  bg: "blue.500",
                }}
                rounded="md"
                w="100%"
                onClick={() => {
                  resetPasswordHandler();
                }}
              >
                Change password
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};

export default ResetPassword;
