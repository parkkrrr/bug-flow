import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueFormClientWrapper";

const EditIssue = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (isNaN(parseInt(id))) notFound();
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssue;
