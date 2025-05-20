"use client";

import { Button as RadixButton } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

const Button = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixButton asChild>
        <a className="flex items-center gap-3">{children}</a>
      </RadixButton>
    </Link>
  );
};

export default Button;
