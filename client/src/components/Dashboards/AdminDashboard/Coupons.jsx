import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CouponForm from "./CouponForm";
import axios from "axios";
import CouponItem from "./CouponItem";

const Coupons = () => {
  const [coupons, setCoupons] = useState();
  const getAllCoupons = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/get-coupons`
      );
      setCoupons(data.coupons);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCoupons();
  }, []);
  return (
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
        Coupons
      </Text>
      <CouponForm reload={getAllCoupons} />
      {coupons?.map((coupon) => (
        <CouponItem coupon={coupon} reload={getAllCoupons} />
      ))}
      {coupons?.length === 0 && <Text>No coupons available</Text>}
    </Flex>
  );
};

export default Coupons;
