import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import image1 from "../../assets/Career/career1.png";

const CareerHeader = () => {
  return (
    <Flex
      justifyContent={{ base: "center" }}
      maxH={{ base: "20rem", xl: "28rem" }}
    >
      <Text
        display={{ base: "none", md: "flex" }}
        maxW="363px"
        fontWeight="bold"
        fontSize={{ base: "2.5rem" }}
        textAlign="left"
        alignSelf="center"
        ps="10"
        fontFamily="Playfair Display serif"
      >
        Want to start working with us?
      </Text>
      <Image
        w={{ base: "100%", md: "50%" }}
        src={image1}
        objectFit="contain"
        objectPosition={{ md: "right" }}
      />
    </Flex>
  );
};

export default CareerHeader;
