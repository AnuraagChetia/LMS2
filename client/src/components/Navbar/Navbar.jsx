import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Link,
  Box,
} from "@chakra-ui/react";
import logo from "../../assets/Navbar/logo.jpeg";

import React, { useEffect, useRef, useState } from "react";
import NavDrawer from "./NavDrawer";
import SearchDrawer from "./SearchDrawer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import NavCart from "./NavCart";
import axios from "axios";
import CourseSearchCard from "./CourseSearchCard";
import NavBarMenu from "./NavBarMenu";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState();
  const [filteredCourses, setFilteredCourses] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const searchInputRef = useRef();

  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  //navigate
  const navigate = useNavigate();
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/all`
      );
      setCourses(data.courses);
      setFilteredCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle search bar input change.
  const searchhandler = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredItems);
  };

  //teach on LMS button handler
  const teachOnLMSHandle = () => {
    dispatch(logout());
    toast({
      title: "You have been logged out",
      description: "Please create a new account as a teacher",
      position: "top-right",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    navigate("/user/signup");
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset;
  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 0);
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [prevScrollPos]);

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <Flex
        as="nav"
        boxShadow="lg"
        position="sticky"
        w="100%"
        zIndex={1}
        p="6"
        rounded="md"
        bg="white"
        justifyContent={"space-between"}
        align={"center"}
        // transition="top 0.3s"
        // top={visible ? 0 : "-100px"}
      >
        <NavDrawer />
        {user.token === "" && (
          <Image
            alt="LMS Logo"
            w="100px"
            src={logo}
            onClick={() => {
              navigate("/");
            }}
            cursor="pointer"
            ml={{ base: 0, sm: "22", md: "30", lg: "20" }}
          />
        )}
        {user.token !== "" && (
          <Image
            alt="LMS Logo"
            w="100px"
            src={logo}
            onClick={() => {
              navigate("/");
            }}
            cursor="pointer"
            ml={{ base: 12, sm: "24", md: "52", lg: "20" }}
            mr={{ base: 4, md: 10 }}
          />
        )}
        <Menu isLazy>
          <MenuButton
            fontWeight={600}
            as={Button}
            px="8"
            variant="ghost"
            display={{ base: "none", lg: "flex" }}
          >
            Categories
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                navigate("/courses/development");
              }}
            >
              Development
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/business");
              }}
            >
              Business
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/finance&accounting");
              }}
            >
              Finance & Accounting
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/it&software");
              }}
            >
              IT & Software
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/office-productivity");
              }}
            >
              Office Productivity
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/personal-development");
              }}
            >
              Personal Development
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/design");
              }}
            >
              Design
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/marketing");
              }}
            >
              Marketing
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/lifestyle");
              }}
            >
              Lifestyle
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/photography&video");
              }}
            >
              Photography & Video
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/health&fitness");
              }}
            >
              Health & Fitness
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/music");
              }}
            >
              Music
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/courses/teaching&academics");
              }}
            >
              Teaching & Academics
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Search courses */}
        <Popover
          returnFocusOnClose={false}
          initialFocusRef={searchInputRef}
          // isOpen={isOpen}
          // onClose={onClose}
          closeOnBlur={true}
          isLazy
        >
          <InputGroup w="30%" display={{ base: "none", lg: "flex" }}>
            <PopoverTrigger>
              <Input
                placeholder="Search course..."
                size="lg"
                ref={searchInputRef}
                borderRadius="20"
                onChange={searchhandler}
                onClick={onToggle}
              />
            </PopoverTrigger>
            <InputRightElement pointerEvents="none">
              <Search2Icon mt={2} />
            </InputRightElement>
          </InputGroup>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody display="flex" flexDir="column" gap="2">
              {filteredCourses?.map((course) => (
                <CourseSearchCard course={course} key={course._id} />
              ))}
              {filteredCourses?.length === 0 && <Flex>No courses</Flex>}
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {user.role === "student" && (
          <Popover placement="bottom-end" trigger="hover">
            <Center>
              <PopoverTrigger>
                <Button
                  px="8"
                  variant="ghost"
                  display={{ base: "none", lg: "flex" }}
                >
                  Teach on LMS
                </Button>
              </PopoverTrigger>
              <PopoverContent padding={2} p="5">
                <PopoverBody fontWeight={700} textAlign={"center"}>
                  Turn what you know into an opportunity and reach millions
                  around the world.
                </PopoverBody>

                <Button
                  colorScheme="blackAlpha"
                  bg="black"
                  onClick={alertOnOpen}
                >
                  Learn more
                </Button>
              </PopoverContent>
            </Center>
          </Popover>
        )}

        {!user.token && (
          <>
            <ButtonGroup display={{ base: "none", lg: "flex" }}>
              <Button
                px="10"
                variant="ghost"
                onClick={() => {
                  navigate("/user/login");
                }}
              >
                Sign in
              </Button>
              <Button
                px="10"
                colorScheme="blue"
                variant="solid"
                onClick={() => {
                  navigate("/user/signup");
                }}
              >
                Sign up
              </Button>
            </ButtonGroup>
          </>
        )}

        <Flex gap={2}>
          <SearchDrawer allCourses={courses} />

          {user.token && (
            <>
              {user.role === "student" && <NavCart />}
              {/* <Popover placement="bottom-end" trigger="hover">
                <Center>
                  <PopoverTrigger>
                    <Button
                      padding="0.4rem"
                      width="auto"
                      height="auto"
                      borderRadius="100%"
                      bg="transparent"
                      _hover={{ bg: "#f6f6f6" }}
                      display={{ base: "none", lg: "block" }}
                    >
                      <IconButton>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          role="img"
                          aria-labelledby="ap1tc5wqdskeg9i5jtulggx2n8axe0vz"
                        >
                          <title id="ap1tc5wqdskeg9i5jtulggx2n8axe0vz">
                            Notifications
                          </title>
                          <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                        </svg>
                      </IconButton>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight="700" p="4">
                      Notifications
                    </PopoverHeader>
                    <Text
                      textAlign="center"
                      color="blue"
                      fontWeight="400"
                      p="10"
                    >
                      No Notifications
                    </Text>
                  </PopoverContent>
                </Center>
              </Popover> */}
              <NavBarMenu />
            </>
          )}
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={alertIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={alertOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure?
            </AlertDialogHeader>

            <AlertDialogBody>
              You will be logged out and navigated to the signup page where you
              will have to create a new account as a Teacher
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={alertOnClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={teachOnLMSHandle} ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* <Box h="98px" className="placeholder"></Box> */}
    </>
  );
};

export default Navbar;
