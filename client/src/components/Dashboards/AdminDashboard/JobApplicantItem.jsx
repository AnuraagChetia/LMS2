import React from "react";
import {
  HStack,
  VStack,
  Text,
  Tag,
  Link,
  useColorModeValue,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const JobApplicantItem = ({ applicant }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <Flex w="100%" px="4">
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
                    {`${applicant?.firstName} ${applicant.lastName}`}
                  </Text>
                  <HStack spacing="1">
                    <Tag size="sm" colorScheme="red">
                      Current CTC : {applicant?.currentCTC}
                    </Tag>
                    <Tag size="sm" colorScheme="green">
                      Expected CTC : {applicant?.expectedCTC}
                    </Tag>
                  </HStack>
                  <ResumeModal applicant={applicant} />
                </HStack>
              </VStack>
            </VStack>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default JobApplicantItem;

const ResumeModal = ({ applicant }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" px="4" colorScheme="green" onClick={onOpen}>
        View
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xxl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <iframe
              src={`${import.meta.env.VITE_BACKEND_URL}/admin/pdf/${
                applicant._id
              }`}
              type="application/pdf"
              width="100%"
              height="800px"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
