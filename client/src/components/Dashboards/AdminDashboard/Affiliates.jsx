import { Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AffiliateForm from "./AffiliateForm";
import axios from "axios";
import { useSelector } from "react-redux";
import AffiliateItem from "./AffiliateItem";
const Affiliates = () => {
  const user = useSelector((state) => state.user);

  const [affiliates, setAffiliates] = useState();
  const [filteredAffiliates, setFilteredAffiliates] = useState();

  const getAffiliates = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-affiliates`,
        { headers: { Authorization: user.token } }
      );
      setAffiliates(data.affiliates);
      setFilteredAffiliates(data.affiliates);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAffiliates();
  }, []);

  const searchhandler = (e) => {
    const searchTerm = e.target.value;

    const filteredItems = affiliates.filter((affiliate) =>
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAffiliates(filteredItems);
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="start"
      gap="6"
      w="100%"
      alignItems="center"
    >
      <Text
        textAlign="center"
        fontSize="2xl"
        fontWeight="600"
        w="100%"
        py="5"
        borderBottom="1px solid gainsboro"
      >
        Affiliates
      </Text>
      <AffiliateForm />
      <Input
        type="text"
        w="50%"
        placeholder="Search an affiliate by email"
        onChange={searchhandler}
      />
      {filteredAffiliates?.map((affiliate) => (
        <AffiliateItem affiliate={affiliate} reload={getAffiliates} />
      ))}
    </Flex>
  );
};

export default Affiliates;
