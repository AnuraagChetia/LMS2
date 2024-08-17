import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import JobListItem from "./JobListItem";

const JobOpenings = ({ jobOpenings }) => {
  const [salesCount, setSalesCount] = useState(0);
  const [operatonsCount, setOperatonsCount] = useState(0);
  const [marketingCount, setMarketingCount] = useState(0);
  const [productAndTechnologyCount, setProductAndTechnologyCount] = useState(0);
  const [customerExperienceCount, setCustomerExperienceCount] = useState(0);
  useEffect(() => {
    setSalesCount(0);
    setCustomerExperienceCount(0);
    setMarketingCount(0);
    setProductAndTechnologyCount(0);
    setCustomerExperienceCount(0);
    setOperatonsCount(0);
    jobOpenings?.forEach((job) => {
      switch (job.department.toLowerCase()) {
        case "marketing":
          setMarketingCount((prev) => prev + 1);
          // Do something for marketing jobs
          break;
        case "operations":
          // Do something for operations jobs
          setOperatonsCount((prev) => prev + 1);
          break;
        case "customer experience":
          // Do something for operations jobs
          setCustomerExperienceCount((prev) => prev + 1);
          break;
        case "product & technology":
          // Do something for operations jobs
          setProductAndTechnologyCount((prev) => prev + 1);
          break;
        case "sales":
          // Do something for operations jobs
          setSalesCount((prev) => prev + 1);
          break;
        // Add more cases as needed
        default:
        // Handle other categories or do nothing
      }
    });
  }, [jobOpenings]);
  return (
    <>
      {/* Marketing */}
      {marketingCount > 0 && (
        <Flex flexDir="column" m="10">
          <Text color="violet" fontSize="20" display="flex" alignItems="center">
            Marketing -{" "}
            <span style={{ color: "black", fontSize: 15, marginTop: 4 }}>
              {marketingCount} Open Role
            </span>
          </Text>
          {jobOpenings?.map((job) => {
            if (job.department.toLocaleLowerCase() === "marketing") {
              return <JobListItem job={job} />;
            }
          })}
        </Flex>
      )}

      {/* Customer Experience */}
      {customerExperienceCount > 0 && (
        <Flex flexDir="column" m="10">
          <Text color="violet" fontSize="20" display="flex" alignItems="center">
            Customer Experience -{" "}
            <span style={{ color: "black", fontSize: 15, marginTop: 4 }}>
              {customerExperienceCount} Open Role
            </span>
          </Text>
          {jobOpenings?.map((job) => {
            if (job.department.toLocaleLowerCase() === "customer experience")
              return <JobListItem job={job} />;
          })}
        </Flex>
      )}
      {/* Sales */}
      {salesCount > 0 && (
        <Flex flexDir="column" m="10">
          <Text color="violet" fontSize="20" display="flex" alignItems="center">
            Sales -{" "}
            <span style={{ color: "black", fontSize: 15, marginTop: 4 }}>
              {salesCount} Open Role
            </span>
          </Text>
          {jobOpenings?.map((job) => {
            if (job.department.toLocaleLowerCase() === "sales") {
              return <JobListItem job={job} />;
            }
          })}
        </Flex>
      )}
      {/* Operations */}
      {operatonsCount > 0 && (
        <Flex flexDir="column" m="10">
          <Text color="violet" fontSize="20" display="flex" alignItems="center">
            Operations -{" "}
            <span style={{ color: "black", fontSize: 15, marginTop: 4 }}>
              {operatonsCount} Open Role
            </span>
          </Text>
          {jobOpenings?.map((job) => {
            if (job.department.toLocaleLowerCase() === "operations")
              return <JobListItem job={job} />;
          })}
        </Flex>
      )}
      {/* Product & Technology */}
      {productAndTechnologyCount > 0 && (
        <Flex flexDir="column" m="10">
          <Text color="violet" fontSize="20" display="flex" alignItems="center">
            Product & Technology -{" "}
            <span style={{ color: "black", fontSize: 15, marginTop: 4 }}>
              {productAndTechnologyCount} Open Role
            </span>
          </Text>
          {jobOpenings?.map((job) => {
            if (job.department.toLocaleLowerCase() === "product & technology")
              return <JobListItem job={job} />;
          })}
        </Flex>
      )}
    </>
  );
};

export default JobOpenings;
