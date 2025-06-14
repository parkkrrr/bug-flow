"use client";

import { Button as RadixButton } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

type radixColor = React.ComponentProps<typeof RadixButton>["color"];
type radixVariant = React.ComponentProps<typeof RadixButton>["variant"];
type onClick = React.ComponentProps<typeof Link>["onClick"];

type Props = {
  href: string;
  children: ReactNode;
  color?: radixColor;
  variant?: radixVariant;
  disabled?: boolean | undefined;
  onClick?: onClick;
};

const Button = ({
  href,
  children,
  color,
  variant,
  disabled,
  onClick,
}: Props) => {
  const buttonProps = {
    ...(color && { color }),
    ...(variant && { variant }),
    ...(disabled && { disabled }),
  };
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixButton {...buttonProps} asChild>
        <a className="flex items-center gap-3" {...(onClick && { onClick })}>
          {children}
        </a>
      </RadixButton>
    </Link>
  );
};

export default Button;
