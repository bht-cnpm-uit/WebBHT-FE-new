'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileMenu({ platformGroup, nav }) {
    const pathName = usePathname();

    const [openMenu, setOpenMennu] = useState(false);
    useEffect(() => {
        setOpenMennu(false);
    }, [pathName]);

    return (
        <div className="flex items-center">
            <button onClick={() => setOpenMennu(true)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="h-8 w-8"
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgb(var(--clr-primary))" />
                            <stop offset="100%" stopColor="rgb(var(--clr-primary-to))" />
                        </linearGradient>
                    </defs>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="url(#gradient)"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>

            <div className="fixed top-0 left-0">
                {/* BACKDROP */}
                <div
                    className={clsx('fixed top-0 left-0 h-screen w-screen bg-black/50 transition duration-150', {
                        'invisible bg-opacity-0': !openMenu,
                    })}
                    onClick={() => setOpenMennu(false)}
                ></div>

                {/* WHITE FRAME */}
                <div
                    className={clsx(
                        'absolute flex h-screen min-w-[400px] flex-col bg-bg transition duration-300 xs:w-screen xs:min-w-0',
                        {
                            '-translate-x-full': !openMenu,
                        }
                    )}
                >
                    <button
                        className="absolute top-3 right-3 inline-block text-primary"
                        onClick={() => setOpenMennu(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-8 w-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* NAV */}
                    {nav}

                    <div className="mt-4 flex justify-center">{platformGroup}</div>
                </div>
            </div>
        </div>
    );
}
