import React from "react";
import {
  HStack,
  VStack,
  Text,
  Tag,
  Link,
  Image,
  useColorModeValue,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const JobItem = ({ job }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <Flex
      w="100%"
      px="4"
      onClick={() => {
        navigate(`/dashboard/admin/job-board/${job.title}`);
      }}
    >
      <Flex w="100%">
        <Flex onClick={toggleOpen} w="100%">
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
            <VStack align="start" justifyContent="flex-start">
              <VStack spacing={0} align="start">
                <HStack>
                  <Text
                    as={Link}
                    // href={`${import.meta.env.VITE_FRONTEND_URL}/${course._id}`}
                    fontWeight="bold"
                    fontSize="md"
                    noOfLines={1}
                    onClick={(e) => e.stopPropagation()}
                    isExternal
                  >
                    {job?.title}
                  </Text>
                  <HStack spacing="1">
                    <Tag size="sm" colorScheme="gray">
                      {job?.location}
                    </Tag>
                    <Tag size="sm" colorScheme="red">
                      {job?.experienceLevel}
                    </Tag>
                  </HStack>
                  <Button
                    size="sm"
                    p="1"
                    colorScheme="green"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/dashboard/admin/job-board/job-applicants/${job._id}`
                      );
                    }}
                    px='2'
                  >
                    Applicants
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default JobItem;
