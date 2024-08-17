import {
  Button,
  Center,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import NavCartItem from "./NavCartItem";
import { useNavigate } from "react-router-dom";

const NavCart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Popover placement="bottom-end" trigger="hover">
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
            me='2'
          >
            <Icon as={MdOutlineShoppingCart} boxSize={6} mt="1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent padding={2} p="5">
          {!user?.student?.cart?.length && (
            <>
              <PopoverBody fontWeight="700" textAlign="center">
                Your cart is empty
              </PopoverBody>
              <Link
                textAlign="center"
                color="blue"
                fontWeight="500"
                onClick={() => {
                  navigate("/courses/all");
                }}
              >
                Keep shopping
              </Link>
            </>
          )}
          {user?.student?.cart?.length !== 0 && (
            <>
              <PopoverBody textAlign="center" p="0">
                <Stack
                  direction="column"
                  divider={<StackDivider />}
                  h="fit-content"
                  maxH="80"
                  overflow="clip"
                  // overflowX="hidden"
                  gap="2"
                >
                  {user?.student?.cart?.map((course) => (
                    <NavCartItem courseId={course} key={course._id} />
                  ))}
                </Stack>
              </PopoverBody>

              <Button
                colorScheme="blue"
                onClick={() => {
                  navigate("/cart");
                }}
                w="100%"
                mt="3"
              >
                Go to cart
              </Button>
            </>
          )}
        </PopoverContent>
      </Center>
    </Popover>
  );
};

export default NavCart;
