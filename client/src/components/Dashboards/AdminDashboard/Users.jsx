import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";
import { Flex, Input, Text } from "@chakra-ui/react";

const Users = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState();
  const [search, setSearchTerm] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  // Function to handle search bar input change.
  const searchhandler = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = users.filter((users) =>
      users.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/get-users`,
        { headers: { Authorization: user.token } }
      );
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
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
        Users
      </Text>
      <Input
        type="text"
        w="50%"
        placeholder="Enter user email"
        onChange={searchhandler}
      />
      {filteredUsers?.map((user) => (
        <UserItem user={user} key={user._id} reload={getAllUsers} />
      ))}
      {filteredUsers?.length === 0 && <Text>No users available</Text>}
    </Flex>
  );
};

export default Users;
