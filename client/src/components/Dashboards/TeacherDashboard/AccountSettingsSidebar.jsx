// import {
//   Avatar,
//   Flex,
//   Text,
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   FormLabel,
//   Heading,
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   useToast,
// } from "@chakra-ui/react";
// import React from "react";
// import { useSelector } from "react-redux";

// const AccountSettingsSidebar = () => {
//   const user = useSelector((state) => state.user);
//   return (
//     <>
//       <Flex
//         flexDirection="column"
//         gap="2"
//         borderBottom="1px solid gainsboro"
//         w="100%"
//         h="fit-content"
//       >
//         <Flex
//           flexDirection="row"
//           alignItems="center"
//           gap="2"
//           my="4"
//           mx="4"
//           justifyContent="start"
//         >
//           <Avatar
//             name={`${user.firstName} ${user.lastName}`}
//             bgColor="black"
//             color="white"
//             src={user.avatar}
//             size="xl"
//           />
//           <Text>{`${user.firstName} ${user.lastName}`}</Text>
//         </Flex>
//       </Flex>
//     </>
//   );
// };

// export default AccountSettingsSidebar;
