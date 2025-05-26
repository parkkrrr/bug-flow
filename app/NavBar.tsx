"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
                const isActive = isHydrated && currentPath === link.href;
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
              <Link href={"/api/auth/signout"}>Logout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
