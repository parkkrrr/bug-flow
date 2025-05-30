import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/app/components";
const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button href={`/issues/edit/${issueId}`}>
      <Pencil2Icon />
      Edit Issue
    </Button>
  );
};

export default EditIssueButton;
