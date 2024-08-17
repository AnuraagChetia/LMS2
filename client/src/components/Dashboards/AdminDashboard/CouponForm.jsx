import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
const CouponForm = ({ reload }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [code, setCode] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [validFrom, setValidFrom] = useState();
  const [validUntill, setValidUntill] = useState();
  const [minOrderAmount, setMinOrderAmount] = useState();
  const [maxDiscountAmount, setMaxDiscountAmount] = useState();
  const [maxUses, setMaxUses] = useState();
  const [description, setDescription] = useState();
  const [termsAndCondition, setTermsAndCondition] = useState();

  const submitHandler = async () => {
    try {
      const payload = {
        code,
        discountPercentage,
        validFrom,
        validUntill,
        minOrderAmount,
        maxDiscountAmount,
        maxUses,
        description,
        termsAndCondition,
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/coupon/create`,
        payload,
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Coupon created!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        reload();
      } else {
        toast({
          title: "Something went wrong!",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add New Discount coupon</Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new discount coupon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap="2">
              <Input
                type="text"
                placeholder="Code"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <Input
                type="bumber"
                placeholder="Discount Percentage"
                onChange={(e) => {
                  setDiscountPercentage(e.target.value);
                }}
              />
              <Box>
                <FormLabel m="0">Valid from :</FormLabel>
                <Input
                  type="date"
                  placeholder="Valid from"
                  onChange={(e) => {
                    setValidFrom(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <FormLabel m="0">Valid to :</FormLabel>
                <Input
                  type="date"
                  placeholder="Valid to"
                  onChange={(e) => {
                    setValidUntill(e.target.value);
                  }}
                />
              </Box>
              <Input
                type="number"
                placeholder="Min order amount"
                onChange={(e) => {
                  setMinOrderAmount(e.target.value);
                }}
              />
              <Input
                type="number"
                placeholder="Max Discount amount"
                onChange={(e) => {
                  setMaxDiscountAmount(e.target.value);
                }}
              />
              <Input
                type="number"
                placeholder="Max uses"
                onChange={(e) => {
                  setMaxUses(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Textarea
                type="text"
                placeholder="Terms and Conditions"
                onChange={(e) => {
                  let input = e.target.value.split(",");
                  setTermsAndCondition(input);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                submitHandler();  
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

export default CouponForm;
