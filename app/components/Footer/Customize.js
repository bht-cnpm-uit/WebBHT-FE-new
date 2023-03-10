'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

function ThemeSwitch() {
    const [isLight, setIsLight] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') {
            return setIsLight(false);
        }
    }, []);

    const toggleSwitch = () => {
        document.documentElement.setAttribute('data-color-scheme', !isLight ? 'light' : 'dark');
        if (!isLight) {
            document.documentElement.classList.remove('dark');
            typeof window !== 'undefined' && localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            typeof window !== 'undefined' && localStorage.setItem('theme', 'dark');
        }

        setIsLight(!isLight);
    };

    return (
        <div
            onClick={toggleSwitch}
            className={clsx(
                'mt-2 flex h-8 w-[70px] cursor-pointer items-center rounded-full bg-gradient-to-r from-primary/40 to-primary-to/40 px-0.5',
                {
                    'justify-end': !isLight,
                }
            )}
        >
            <motion.div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-light/50" layout>
                {isLight ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-orange-500"
                    >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-cyan-400"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </motion.div>
        </div>
    );
}

export default function Customize() {
    return (
        <div className="flex min-w-[180px] flex-col md:mt-8 xs:items-center">
            <p className="text-lg font-semibold text-text-semidark">Tu??? ch???nh</p>
            <div className="mt-1 flex flex-col xs:text-center">
                <ThemeSwitch />
            </div>
        </div>
    );
}
