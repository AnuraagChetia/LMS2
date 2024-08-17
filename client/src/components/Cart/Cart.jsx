import {
  Button,
  Flex,
  Grid,
  GridItem,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Flex flexDir={{ base: "column" }}>
      <Text
        py="10"
        fontSize="xxx-large"
        fontWeight="600"
        bgColor="black"
        color="white"
        ps={{ base: 3, "2xl": "8" }}
      >
        Your Cart
      </Text>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        mt="4"
        justifyContent={{ md: "space-between" }}
        mx={{ "2xl": "40" }}
      >
        <VStack divider={<StackDivider borderColor="grey.200" />}>
          {user.student.cart?.map((course) => (
            <CartItem courseId={course} key={course} />
          ))}
        </VStack>
        {user.student.cart?.length == 0 && (
          <Flex
            flexDirection="column"
            w="100%"
            mx={{ md: 20 }}
            p="20"
            alignItems={"center"}
            border="1px solid"
            borderColor="gainsboro"
            gap="4"
          >
            <Text>Your cart is empty. Keep shopping to find a course!</Text>
            <Button
              onClick={() => {
                navigate(`/courses/all`);
              }}
              colorScheme="blue"
            >
              Keep shopping
            </Button>
          </Flex>
        )}

        {user.student.cart?.length !== 0 && (
          <CartTotal total={user.student.cartTotal} />
        )}
      </Flex>
    </Flex>
  );
};

export default Cart;
