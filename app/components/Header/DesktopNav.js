'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NavLink from '../NavLink';

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

export default function DesktopNav() {
    const [hover, setHover] = useState(-1);

    function handleHover(index) {
        setHover(index);
    }
    function handleLeave(index) {
        if (hover === index) {
            setHover(-1);
        }
    }

    return (
        <nav className="md:hidden">
            {MENU.map((menu, index) => (
                <NavLink
                    key={index}
                    href={menu.href}
                    className="relative px-3 py-2 font-semibold text-text-semidark hover:text-primary [&.active]:text-primary"
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleLeave(index)}
                >
                    {({ isActive }) => (
                        <>
                            <span>{menu.content}</span>
                            {((isActive && hover === -1) || hover === index) && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r from-primary to-primary-to"
                                ></motion.div>
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
