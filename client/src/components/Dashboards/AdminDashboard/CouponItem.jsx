import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  chakra,
  Container,
  HStack,
  VStack,
  Text,
  Tag,
  Link,
  Image,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

const CouponItem = ({ coupon, reload }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const validUntill = new Date(coupon.validUntill);
  // Options for formatting the date
  const options = { day: "numeric", month: "short", year: "numeric" };
  // Convert date to the desired format
  const validUntillSorted = validUntill.toLocaleDateString("en-US", options);

  const activateHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/coupon/activate-coupon/${
          coupon._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Coupon Activated!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const suspendHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/coupon/suspend-coupon/${
          coupon._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Coupon Deactivated!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const deleteHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/coupon/delete-coupon/${
          coupon._id
        }`,
        {},
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        toast({
          title: "Coupon Deleted!",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="100%">
      <VStack>
        <chakra.div w="100%">
          <HStack
            p={4}
            bg={useColorModeValue("white", "gray.800")}
            rounded="xl"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.100", "gray.700")}
            w="100%"
            h="100%"
            textAlign="left"
            align="start"
            spacing={4}
            cursor="pointer"
            _hover={{ shadow: "lg" }}
            bgColor={coupon.status === "deactivated" && "#ffcccc"}
          >
            <Flex
              flexDir="column"
              gap="2"
              w="100%"
              justifyContent="space-between"
            >
              <HStack>
                <Text
                  as={Link}
                  fontWeight="bold"
                  fontSize="md"
                  noOfLines={1}
                  onClick={(e) => e.stopPropagation()}
                  isExternal
                  w="80%"
                >
                  {coupon.code}
                </Text>
                <Flex gap="2" flexWrap="wrap">
                  <Tag size="sm" colorScheme="gray">
                    {coupon.discountPercentage}%
                  </Tag>
                  <Tag size="sm" colorScheme="red">
                    Valid till {validUntillSorted}
                  </Tag>
                  <Tag size="sm" colorScheme="green">
                    Max uses : {coupon.maxUses}
                  </Tag>
                  <Tag size="sm" colorScheme="red">
                    Current uses : {coupon.usedCount}
                  </Tag>

                  <Tag size="sm" colorScheme="red">
                    Max discount amount :{" "}
                    {coupon.maxDiscountAmount || "No limit"}
                  </Tag>
                </Flex>
              </HStack>
              <Text>{coupon.description}</Text>
            </Flex>
            <Menu w="100%">
              <MenuButton as={Button} size="sm" w="fit-content">
                <Icon as={ChevronDownIcon} />
              </MenuButton>

              <MenuList>
                <MenuItem onClick={onOpen}>Delete</MenuItem>
                <MenuItem
                  onClick={() => {
                    activateHandler();
                  }}
                >
                  Activate
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    suspendHandler();
                  }}
                >
                  Suspend
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </chakra.div>
      </VStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteHandler();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default CouponItem;
