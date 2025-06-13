"use client";

import { Button } from "@/app/components/index";
import { Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";

export function ButtonNewIssue() {
  return (
    <Flex mb="5" justify={"between"}>
      <Button href="/issues/new">New Issue</Button>
      <IssueStatusFilter />
    </Flex>
  );
}
