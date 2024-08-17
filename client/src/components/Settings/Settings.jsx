import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import PhotoTab from "./PhotoTab";
import AccountSecurity from "./AccountSecurity";
import CloseAccountTab from "./CloseAccountTab";

const Settings = () => {
  const { tab } = useParams();
  return (
    <>
      {/* side panel */}
      <Flex border="1px solid gainsboro" m="8">
        <Sidebar />
        {tab === "profile" && <ProfileTab />}
        {tab === "photo" && <PhotoTab />}
        {tab === "account-security" && <AccountSecurity />}
        {tab === "close-account" && <CloseAccountTab />}
      </Flex>
    </>
  );
};

export default Settings;
