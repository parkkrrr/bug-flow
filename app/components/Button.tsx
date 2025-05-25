"use client";

import { Button as RadixButton } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

type radixColor = React.ComponentProps<typeof RadixButton>["color"];
type radixVariant = React.ComponentProps<typeof RadixButton>["variant"];

type Props = {
  href: string;
  children: ReactNode;
  color?: radixColor;
  variant?: radixVariant;
};

const Button = ({ href, children, color, variant }: Props) => {
  const buttonProps = {
    ...(color && { color }),
    ...(variant && { variant }),
  };
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixButton {...buttonProps} asChild>
        <a className="flex items-center gap-3">{children}</a>
      </RadixButton>
    </Link>
  );
};

export default Button;
