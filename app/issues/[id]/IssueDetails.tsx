import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { Heading, Flex, Card,Text } from "@radix-ui/themes";
import React from "react";
import Markdown from "react-markdown";

const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <>

      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="4" className="prose max-w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
