import { HamburgerIcon, Icon } from "@chakra-ui/icons";
import {
  Button,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  useDisclosure,
  Link,
  Box,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact-us" },
  { name: "Career", href: "/career" },
];

const categories = [
  { name: "Development", href: "/courses/development" },
  { name: "Business", href: "/courses/business" },
  { name: "Finance & Accounting", href: "/courses/finance&accounting" },
  { name: "IT & Software", href: "/courses/it&software" },
  { name: "Personal Development", href: "/courses/personal-development" },
  { name: "Design", href: "/courses/design" },
  { name: "Marketing", href: "/courses/marketing" },
  { name: "Lifestyle", href: "/courses/lifestyle" },
  { name: "Photo & Video", href: "/courses/photo&video" },
  { name: "Health & Fitness", href: "/courses/health&fitness" },
  { name: "Music", href: "/courses/music" },
  { name: "Teaching & Academics", href: "/courses/teaching&academics" },
];

const NavDrawer = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Button
        ref={btnRef}
        bg={"none"}
        onClick={onOpen}
        display={{ lg: "none" }}
      >
        <Icon as={HamburgerIcon} boxSize={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent pt="2" overflowY={{ base: "auto", md: "hidden" }}>
          {user.token === "" && (
            <>
              <Box position="relative" pt="2">
                <Divider />
                <AbsoluteCenter
                  bg="white"
                  px="4"
                  fontWeight="bold"
                  color="grey"
                >
                  Login
                </AbsoluteCenter>
              </Box>
              <Link
                p="3"
                onClick={() => {
                  navigate("/user/login");
                  onClose();
                }}
                fontSize="14"
                fontWeight="600"
                _hover={{ bgColor: "gainsboro" }}
              >
                Sign in
              </Link>
              <Link
                p="3"
                onClick={() => {
                  navigate("/user/signup");
                  onClose();
                }}
                fontSize="14"
                fontWeight="600"
                _hover={{ bgColor: "gainsboro" }}
              >
                Sign up
              </Link>
            </>
          )}
          <Box position="relative" p="2">
            <Divider />
            <AbsoluteCenter bg="white" px="4" fontWeight="bold" color="grey">
              Pages
            </AbsoluteCenter>
          </Box>
          {pages.map((page) => (
            <Link
              p="2"
              fontSize="14"
              fontWeight="600"
              _hover={{ bgColor: "gainsboro" }}
              onClick={() => {
                navigate(`${page.href}`);
                onClose();
              }}
              key={page.name}
            >
              {page.name}
            </Link>
          ))}

          <Box position="relative" p="2">
            <Divider />
            <AbsoluteCenter bg="white" px="4" fontWeight="bold" color="grey">
              Most popular
            </AbsoluteCenter>
          </Box>

          {categories.map((category) => (
            <Link
              key={category.name}
              p="2"
              fontSize="14"
              fontWeight="600"
              _hover={{ bgColor: "gainsboro" }}
              onClick={() => {
                navigate(`${category.href}`);
              }}
            >
              {category.name}
            </Link>
          ))}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
