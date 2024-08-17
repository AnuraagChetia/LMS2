import {
  Button,
  Flex,
  Input,
  InputGroup,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import useRazorpay from "react-razorpay";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emptyCart, updateStudent } from "../../store/userSlice";

const CartTotal = ({ total }) => {
  const user = useSelector((state) => state.user);
  const [coupon, setCoupon] = useState();
  const [totalAmount, setTotalAmount] = useState(total);
  const [Razorpay] = useRazorpay();
  const [discount, setDiscount] = useState();
  const [deductedAmount, setDeductedAmount] = useState();
  const toast = useToast();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const checkoutHandler = async () => {
    //backend request to create new order
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/student/buy-course`,
      { coupon: coupon },
      {
        headers: { Authorization: user.token },
      }
    );
    // const razorpay = new Razorpay({ key: res.keyId });
    const options = {
      key: res.data.keyId,
      order_id: res.data.orderId,
      handler: async (response) => {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/student/success-payment`,
          { ...response, code: coupon },
          {
            headers: { Authorization: user.token },
          }
        );
        //show successful toast
        toast({
          title: "Order Successful !",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        //update cart
        dispatch(emptyCart());

        //update user courses field
        dispatch(updateStudent(data.student));

        //navigate to my learnings
        navigate("/my-courses");
      },
    };

    const rzp = new Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log(response);
      axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/student/failed-payment`,
        response,
        {
          headers: { Authorization: user.token },
        }
      );
      toast({
        title: "Transaction failed !",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
    rzp.open();
  };

  const applyDiscount = (
    totalAmount,
    discountPercentage,
    maxDiscountAmount
  ) => {
    // Validate input values
    if (
      typeof totalAmount !== "number" ||
      typeof discountPercentage !== "number"
    ) {
      throw new Error(
        "Invalid input. totalAmount and discountPercentage must be numbers."
      );
    }
    console.log(discountPercentage);

    // Calculate the discount amount
    const discountAmount = totalAmount * (discountPercentage / 100);

    // Determine the actual deducted amount considering the maximum discount amount
    const actualDiscountAmount =
      maxDiscountAmount === null
        ? discountAmount
        : Math.min(discountAmount, maxDiscountAmount);

    // Calculate the discounted total amount
    const discountedTotal = totalAmount - actualDiscountAmount;
    setDeductedAmount(actualDiscountAmount);
    setTotalAmount(discountedTotal);
  };

  const applyCouponHandler = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/student/check-coupon`,
        { coupon: coupon },
        { headers: { Authorization: user.token } }
      );
      if (data.success) {
        setDiscount({
          code: data.code,
          description: data.description,
          discountPercentage: data.discountPercentage,
          maxDiscountAmount: data.maxDisCountAmount,
        });
        applyDiscount(total, data.discountPercentage, data.maxDisCountAmount);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error !",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Stack
        direction="column"
        spacing="2"
        divider={<StackDivider borderColor="grey.100" />}
        mx={{ base: "6" }}
        mt="2"
      >
        <Stack>
          <Text fontWeight="600" fontSize="20">
            Total:
          </Text>
          <Text fontSize={{ base: "x-large", sm: "xx-large" }}>
            ₹{totalAmount}
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => {
              checkoutHandler();
            }}
          >
            Checkout
          </Button>
        </Stack>
        <Stack>
          {discount && (
            <Flex flexDir="column">
              <Text fontWeight="600">
                <span style={{ fontWeight: 800 }}>{discount.code}</span> has
                been applied
              </Text>
              <Text fontWeight="400">{discount.description}</Text>
              <Text fontWeight="400">
                - ₹{deductedAmount} has been deducted
              </Text>
            </Flex>
          )}
          <Text>Promotions</Text>
          <InputGroup>
            <Input
              borderRadius="0"
              onChange={(e) => {
                setCoupon(e.target.value);
              }}
            />
            <Button
              borderRadius="0"
              onClick={() => {
                applyCouponHandler();
              }}
            >
              Apply
            </Button>
          </InputGroup>
        </Stack>
      </Stack>
    </>
  );
};

export default CartTotal;
