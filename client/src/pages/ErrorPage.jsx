import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";
import errorImg from "../assets/Error/errorPage.jpeg";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      flexDir={{ base: "column", md: "row" }}
    >
      <Flex flexDir={{ base: "column", md: "row" }} alignItems="center">
        <Image
          src={errorImg}
          boxSize={{ base: 300, md: 400, xl: 600 }}
          fit="contain"
        />
        <Flex
          flexDir="column"
          alignItems="center"
          w="100%"
          justifyContent="center"
        >
          <Text
            fontSize={{ base: 40, xl: 60 }}
            textAlign="center"
            fontWeight="700"
          >
            AWWW...DON'T CRY.
          </Text>
          <Text fontWeight="600" textAlign="center">
            It's just a {error.status} Error!
          </Text>
          <Text fontWeight="600" textAlign="center">
            What you're looking for may have been misplaced in Long Term Memory
          </Text>
          <Button
            mt="6"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home Page
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ErrorPage;
