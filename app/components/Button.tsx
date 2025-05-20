"use client";

import { Flex, Button as RadixButton } from "@radix-ui/themes";
import Link from "next/link";
import React, { ReactNode } from "react";

const Button = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixButton asChild>
        <a>
          <Flex gap="2" align={"center"}>
            {children}
          </Flex>
        </a>
      </RadixButton>
    </Link>
  );
};

export default Button;
