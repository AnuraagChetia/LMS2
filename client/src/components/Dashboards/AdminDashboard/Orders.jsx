import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-orders`,
        { headers: { Authorization: user.token } }
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Flex flexDir="column" w="100%">
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
          Recent Orders
        </Text>
        {orders?.map((order) => (
          <OrderItem order={order} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Orders;
