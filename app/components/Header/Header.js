'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavLink from '../NavLink';
import MobileMenu from './MobileMenu';
import DesktopNav from './DesktopNav';

export default function Header({ platformGroup }) {
    const [inTop, setInTop] = useState(true);

    useEffect(() => {
        function handler() {
            const offsetY = window.pageYOffset || document.documentElement.scrollTop;
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
                'fixed top-0 z-header flex h-h-header w-full items-center justify-between bg-bg px-p-body transition-shadow duration-300',
                {
                    'border-gray-200 shadow-lg shadow-gray-600/5 dark:shadow-gray-500/5': !inTop,
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
            <DesktopNav />

            {/* ACTION BUTTON GROUP */}
            <div className="flex flex-1 justify-end md:hidden">{platformGroup}</div>

            {/* MOBILE GROUP */}
            <MobileMenu platformGroup={platformGroup} />
        </header>
    );
}
