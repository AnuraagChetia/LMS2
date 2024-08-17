import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  useToast,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AffiliateItem = ({ affiliate, reload }) => {
  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Flex as="span" flex="1" textAlign="left" gap="10">
              <Text fontWeight="600">{affiliate?.name}</Text>
              <Text fontWeight="600">{affiliate?.subject}</Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {affiliate?.email}
              </Text>
            </Flex>
            <EditForm affiliate={affiliate} reload={reload} />
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} bgColor="gray.100">
          <Text>
            <span style={{ fontWeight: "bold" }}>Contact:</span>{" "}
            {affiliate?.phone}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Bonus per referral:</span> ₹
            {affiliate?.bonusPerReferral}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Balance: </span>
            {affiliate?.balance}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Discount: </span>₹
            {affiliate?.discount}
          </Text>
          <Text>
            <span style={{ fontWeight: "bold" }}>Number of referrals: </span>
            {affiliate?.referrals?.length}
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AffiliateItem;

const EditForm = ({ affiliate, reload }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [name, setName] = useState(affiliate.name);
  const [email, setEmail] = useState(affiliate.email);
  const [code, setCode] = useState(affiliate.code);
  const [phone, setPhone] = useState(affiliate.phone);
  const [discountPercentage, setDiscountPercentage] = useState(affiliate.discountPercentage);
  const [bonusPerReferral, setBonusPerReferral] = useState(
    affiliate.bonusPerReferral
  );
  const [balance, setBalance] = useState(affiliate.balance);

  //edit handler
  const editAffiliateHandler = async () => {
    try {
      const payload = {
        name,
        email,
        code,
        phone,
        discountPercentage,
        bonusPerReferral,
        balance,
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/edit-affiliate/${
          affiliate._id
        }`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  //delete handler
  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/delete-affiliate/${
          affiliate._id
        }`,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Button
        size="sm"
        px="3"
        mr="2"
        colorScheme="yellow"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Edit affiliate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap="1">
              <Box>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </Box>
              <Box>
                <FormLabel>Code:</FormLabel>
                <Input
                  type="text"
                  placeholder="Code"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  value={affiliate.code}
                />
              </Box>
              <Box>
                <FormLabel>Bonus per referral:</FormLabel>
                <Input
                  type="text"
                  placeholder="Incentive per refferal"
                  onChange={(e) => {
                    setBonusPerReferral(e.target.value);
                  }}
                  value={bonusPerReferral}
                />
              </Box>
              <Box>
                <FormLabel>Phone:</FormLabel>
                <Input
                  type="number"
                  placeholder="Phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                />
              </Box>
              <Box>
                <FormLabel>Discount Percentage % :</FormLabel>
                <Input
                  type="number"
                  placeholder="Discount percentage %"
                  onChange={(e) => {
                    setDiscountPercentage(e.target.value);
                  }}
                  value={discountPercentage}
                />
              </Box>
              <Box>
                <FormLabel>Balance :</FormLabel>
                <Input
                  type="number"
                  placeholder="Balance"
                  onChange={(e) => {
                    setBalance(e.target.value);
                  }}
                  value={balance}
                />
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                deleteHandler();
              }}
            >
              Delete
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                editAffiliateHandler();
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
