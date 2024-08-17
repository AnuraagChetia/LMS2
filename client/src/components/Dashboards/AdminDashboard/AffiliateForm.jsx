import React, { useState } from "react";
import {
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
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
const AffiliateForm = () => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [phone, setPhone] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [bonusPerReferral, setBonusPerReferral] = useState();

  const toast = useToast();
  const createNewAffiliateHandler = async () => {
    try {
      let payload = { name, email, code, bonusPerReferral, phone, discountPercentage };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/create-affiliate`,
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
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong !",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>Add new affiliate</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create new affiliate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap="2">
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Code"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Incentive per refferal"
                onChange={(e) => {
                  setBonusPerReferral(e.target.value);
                }}
              />
              <Input
                type="number"
                placeholder="Phone number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <Input
                type="number"
                placeholder="Discount percentage %"
                onChange={(e) => {
                  setDiscountPercentage(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                createNewAffiliateHandler();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AffiliateForm;
