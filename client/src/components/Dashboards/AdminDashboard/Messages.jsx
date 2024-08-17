import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import ContactItem from "./ContactItem";
const Messages = () => {
  const user = useSelector((state) => state.user);
  const [contacts, setContacts] = useState([]);
  const getAllContacts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-contacts`,
        { headers: { Authorization: user.token } }
      );
      console.log(data);
      setContacts(data.contact);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <Flex w="100%">
      <Flex
        flexDirection="column"
        w="100%"
        justifyContent="start"
        alignItems="center"
        gap="6"
        mt="2"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="600"
          w="100%"
          py="5"
          borderBottom="1px solid gainsboro"
        >
          Contacts
        </Text>
        {contacts?.map((contact) => (
          <ContactItem contact={contact} />
        ))}
        {contacts?.length === 0 && <Text>No contacts available</Text>}
      </Flex>
    </Flex>
  );
};

export default Messages;
