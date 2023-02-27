'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NavLink from '../NavLink';
import MobileMenu from './MobileMenu';

const MENU = [
    {
        href: '/',
        content: 'Trang chủ',
    },
    {
        href: '/about',
        content: 'Giới thiệu',
    },
    {
        href: '/document',
        content: 'Tài liệu',
    },
];

export default function Header({ platformGroup }) {
    const [inTop, setInTop] = useState(true);
    const [hiddenHeader, setHiddenHeader] = useState(false);

    const lastScrollY = useRef(0);
    useEffect(() => {
        function handler() {
            const offsetY = window.pageYOffset || document.documentElement.scrollTop;
            // console.log({ offsetY, f: lastScrollY.current });
            // if (offsetY > lastScrollY.current && offsetY > 250) {
            //     setHiddenHeader(true);
            // }
            // if (offsetY < lastScrollY.current || offsetY <= 250) {
            //     setHiddenHeader(false);
            // }
            lastScrollY.current = offsetY;
            setInTop(offsetY < 80);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handler);
        }
        return () => {
            window.removeEventListener('scroll', handler);
        };
    }, []);

    return (
        <header
            className={clsx(
                'fixed top-0 z-header flex h-h-header w-full items-center justify-between bg-bg/70 px-p-body backdrop-blur transition-shadow duration-300',
                {
                    'shadow-lg shadow-gray-600/5 dark:shadow-gray-500/5': !inTop,
                    // '-translate-y-h-header': hiddenHeader,
                }
            )}
        >
            {/* LOGO */}
            <div className="flex flex-1 items-center md:flex-initial">
                <Link href="/">
                    <img src="/images/logo.png" className="h-11 w-11" alt="logo" />
                </Link>
            </div>

            {/* MENU */}
            <nav className="md:hidden">
                {MENU.map((menu, index) => (
                    <NavLink
                        key={index}
                        href={menu.href}
                        className="px-3 py-2 font-semibold text-text-semidark hover:text-primary [&.active]:text-primary"
                    >
                        {menu.content}
                    </NavLink>
                ))}
            </nav>

            {/* ACTION BUTTON GROUP */}
            <div className="flex flex-1 justify-end md:hidden">{platformGroup}</div>

            {/* MOBILE GROUP */}
            <MobileMenu platformGroup={platformGroup} />
        </header>
    );
}
