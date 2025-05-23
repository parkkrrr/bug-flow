"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 px-5 mb-5 h-14 border-b items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => {
          const isActive = isHydrated && currentPath === link.href;
          return (
            <Link
              className={classNames(
                { "text-zinc-900": isActive },
                { "text-zinc-500": !isActive },
                { "hover:text-zinc-800 transition-colors": true }
              )}
              // className={`$(currentPath===link.href?"text-zinc-900":"text-zinc-500) hover:text-zinc-800 transition-colors`}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
