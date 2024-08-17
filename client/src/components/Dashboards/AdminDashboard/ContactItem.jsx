import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
} from "@chakra-ui/react";
const ContactItem = ({ contact }) => {
  const dateObject = new Date(contact?.createdAt);
  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Flex as="span" flex="1" textAlign="left" gap="10">
              <Text fontWeight="600">{contact.name}</Text>
              <Text fontWeight="600">{contact.subject}</Text>
              <Text fontWeight="600">{dateObject.toDateString()}</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} bgColor="gray.100">
          <Text>
            <span style={{ fontWeight: "bold" }}>Email:</span> {contact.email}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Contact:</span> 9365631300
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Message:</span>
            {contact.message}
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ContactItem;
