"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
  Button,
} from "@radix-ui/themes";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import Skeleton from "@/app/components/Skeleton"

const NavBar = () => {
  return (
    <nav className=" px-5 mb-5 py-3 border-b ">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-4">
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <li key={link.href}>
            <Link
              className={classNames(
                { "nav-link": true },
                { "!text-zinc-900": isActive }
              )}
              // className={`$(currentPath===link.href?"text-zinc-900":"text-zinc-500) hover:text-zinc-800 transition-colors`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="4rem" height="1.5rem" />;
  if (status === "unauthenticated")
    return <Button onClick={() => signIn()}>Login</Button>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image ?? undefined}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item onClick={() => signOut()}>
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
