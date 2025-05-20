"use client";

import React, { useState } from "react";
import { TextField, Button, Callout, Spinner } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import dynamic from "next/dynamic";
import { Issue } from "@/app/generated/prisma";

type IssueFormData = z.infer<typeof createIssueSchema>;

const SimpleMDE=dynamic(()=>import("react-simplemde-editor"),{ssr:false})

const IssueForm = ({issue}:{issue?:Issue}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
     defaultValues: {
    title: issue?.title || "",
    description: issue?.description || "",
  },
  });

  console.log(issue)

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch{
            setIsSubmitting(false);
            setError("An unexpected error occurred.");
          }
        })}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField.Root  placeholder="Title" {...field} />
          )}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE  defaultValue={issue?.description} placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>{issue?"Edit"
          :"Submit New Issue "}{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
