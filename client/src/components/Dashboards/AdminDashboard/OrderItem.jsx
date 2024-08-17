import React from "react";
import {
  chakra,
  Container,
  HStack,
  VStack,
  Text,
  Tag,
  useColorModeValue,
  Flex,
  Avatar,
} from "@chakra-ui/react";

const OrderItem = ({ order }) => {
  const textColor = useColorModeValue("gray.500", "gray.200");
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
          >
            <Avatar
              name={`${order?.user?.firstName} ${order?.user?.lastName}`}
              src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${
                order?.user?.userName
              }/${order?.user?.userName}.jpeg`}
            />
            <HStack w="100%" justifyContent="space-between">
              <Flex direction="column">
                <Flex gap="1">
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    noOfLines={1}
                    onClick={(e) => e.stopPropagation()}
                    isExternal
                  >
                    {`${order?.user?.firstName} ${order?.user?.lastName}`}
                  </Text>
                  <HStack spacing="1">
                    <Tag
                      size="sm"
                      colorScheme={
                        order?.status?.toLowerCase() == "success"
                          ? "green"
                          : order?.status?.toLowerCase() == "pending"
                          ? "grey"
                          : "red"
                      }
                    >
                      {order?.status}
                    </Tag>
                    <Tag size="sm" colorScheme="gray">
                      ₹ {order?.amount}
                    </Tag>
                  </HStack>
                </Flex>
                <Text fontSize="sm" color={textColor} noOfLines={{ base: 2 }}>
                  <span
                    style={{
                      fontWeight: "500",
                      fontStyle: "italic",
                      color: "black",
                    }}
                  >
                    Courses ordered :{" "}
                  </span>
                  {order.orders?.map((course) => course.title).join(" ")}
                </Text>
              </Flex>
            </HStack>
          </HStack>
        </chakra.div>
      </VStack>
    </Container>
  );
};

export default OrderItem;
