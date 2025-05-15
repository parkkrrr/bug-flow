'use client';

import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ]

    return (
        <nav className='flex space-x-6 px-5 mb-5 h-14 border-b items-center'>
            <Link href="/" ><FaBug /></Link>
            <ul className='flex space-x-4'>
                {/* <li><Link href="/" className='text-zinc-500 hover:text-zinc-800 transition-colors'>Dashboard</Link></li>
                <li><Link href="/issues">Issues</Link> </li> */}
                {links.map(link => (<Link
                    className={classNames(
                        { "text-zinc-900": currentPath === link.href },
                        { 'text-zinc-500': currentPath !== link.href },
                        { "hover:text-zinc-800 transition-colors": true }
                    )}
                    key={link.href} href={link.href}>
                    {link.label}
                </Link>))}

            </ul>
        </nav>
    )
}

export default NavBar