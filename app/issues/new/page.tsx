"use client";

import React from "react";
import { TextField, Button } from "@radix-ui/themes";
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
    const router=useRouter();
    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                const res = await axios.post("/api/issues", data);
                console.log(res.data);
                router.push("/issues")
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
    );
};

export default NewIssue;
