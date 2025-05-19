"use client";

import React, { useState } from "react";
import { TextField, Button,Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const { control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <div className="max-w-xl">
      {error&&<Callout.Root color="red" className="mb-5">
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (err) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField.Root placeholder="Title" {...field} />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
