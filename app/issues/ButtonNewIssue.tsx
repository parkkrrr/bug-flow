"use client";

import { Button } from "@/app/components/index";

export function ButtonNewIssue() {
  return (
    <div className="mb-5">
      <Button href="/issues/new">
       New Issue
      </Button>
    </div>
  );
}
