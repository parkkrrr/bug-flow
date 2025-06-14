import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link, Pagination } from "@/app/components/index";
import { ButtonNewIssue } from "./ButtonNewIssue";
import { Issue, Status } from "@/app/generated/prisma";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
const IssuesPage = async (props: {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    orderDirection: "asc" | "desc";
    page: string;
  }>;
}) => {
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

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  return (
    <div>
      <ButtonNewIssue />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      status: searchParams.status,
                      orderBy: column.value,
                      orderDirection:
                        searchParams.orderBy === column.value
                          ? searchParams.orderDirection === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy &&
                  (searchParams.orderDirection === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
