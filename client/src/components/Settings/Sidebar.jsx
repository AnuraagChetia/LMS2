import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <Flex
        flexDirection="column"
        gap="2"
        borderRight="1px solid gainsboro"
        w="30%"
      >
        <Flex flexDirection="column" alignItems="center" gap="2" mt="4">
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            bgColor="black"
            color="white"
            src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${
              user.userName
            }/${user.userName}.jpeg`}
            size={{ base: "md", lg: "xl" }}
          />
          <Text
            textAlign={{ base: "center" }}
            w="100%"
            fontWeight="600"
            pb="2"
            borderBottom="1px solid gainsboro"
          >{`${user.firstName} ${user.lastName}`}</Text>
        </Flex>
        <Box
          p="2"
          _hover={{ bg: "gainsboro" }}
          onClick={() => {
            navigate("/user/settings/profile");
          }}
          cursor="pointer"
        >
          <Text>Profile</Text>
        </Box>
        <Box
          p="2"
          _hover={{ bg: "gainsboro" }}
          onClick={() => {
            navigate("/user/settings/photo");
          }}
          cursor="pointer"
        >
          <Text>Photo</Text>
        </Box>
        <Box
          p="2"
          _hover={{ bg: "gainsboro" }}
          onClick={() => {
            navigate("/user/settings/account-security");
          }}
          cursor="pointer"
        >
          <Text>Account Security</Text>
        </Box>
        <Box
          p="2"
          _hover={{ bg: "gainsboro" }}
          onClick={() => {
            navigate("/user/settings/close-account");
          }}
          cursor="pointer"
        >
          <Text>Close account</Text>
        </Box>
      </Flex>
    </>
  );
};

export default Sidebar;
