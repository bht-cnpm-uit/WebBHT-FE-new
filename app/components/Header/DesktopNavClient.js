'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NavLink from '../NavLink';

export default function DesktopNavClient({ nav }) {
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
            {nav.map((navItem, index) => (
                <NavLink
                    key={index}
                    href={navItem.link}
                    className="relative px-3 py-2 font-semibold text-text-semidark hover:text-primary [&.active]:text-primary"
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleLeave(index)}
                >
                    {({ isActive }) => (
                        <>
                            <span>{navItem.name}</span>
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
