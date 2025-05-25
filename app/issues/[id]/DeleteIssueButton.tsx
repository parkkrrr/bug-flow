'use client'

import { Button } from "@/app/components";
import { Button as RadixButton, AlertDialog, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <RadixButton color="red">
          <TrashIcon />
          Delete Issue
        </RadixButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <RadixButton variant="soft" color="gray">
              Cancel
            </RadixButton>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              href={`/issues/${issueId}/delete`}
              color="red"
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
