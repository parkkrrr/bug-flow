"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
  Button
} from "@radix-ui/themes";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className=" px-5 mb-5 py-3 border-b ">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-4">
              {links.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      className={classNames(
                        { "text-zinc-900": isActive },
                        { "text-zinc-500": !isActive },
                        { "hover:text-zinc-800 transition-colors": true }
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image ?? undefined}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item onClick={() => signOut()}>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Button onClick={()=>signIn()}>Login</Button>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
