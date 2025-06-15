import { Pagination } from "@/app/components/index";
import { Issue, Status } from "@/app/generated/prisma";
import prisma from "@/prisma/client";
import { ButtonNewIssue } from "./ButtonNewIssue";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Description } from "@radix-ui/themes/components/alert-dialog";
import { Metadata } from "next";

const IssuesPage = async (props: { searchParams: Promise<IssueQuery> }) => {

  const searchParams = await props.searchParams;
  const statuses = Object.values(Status);
  const orderBys: (keyof Issue)[] = ["title", "status", "createdAt"];
  const orderDirections = ["asc", "desc"] as const;
  const orderBy = orderBys.includes(searchParams.orderBy)
    ? searchParams.orderBy
    : "createdAt";

  const orderDirection = orderDirections.includes(searchParams.orderDirection)
    ? searchParams.orderDirection
    : "asc";

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };
  // const orderBy = searchParams.orderBy || "createdAt";
  // const orderDirection = searchParams.orderDirection || "asc";
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy ? { [orderBy]: orderDirection } : undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction={"column"} gap={"3"}>
      <ButtonNewIssue />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";

export const metadata:Metadata={
  title:"Issue Tracker - Issue List",
  description:"View all project issues"
}

export default IssuesPage;
