'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useMotionValueEvent, motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MobileMenu from './MobileMenu';

export default function MobileHeader({ platformGroup, nav }) {
    const [isInTop, setIsInTop] = useState(true);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (val) => {
        if (val > 100) {
            setIsInTop(false);
        } else {
            setIsInTop(true);
        }
    });

    return (
        <header
            className={clsx(
                'fixed top-0 z-header hidden h-h-header-small w-full items-center justify-between bg-bg px-p-body transition-shadow duration-300 md:flex',
                {
                    'shadow-lg shadow-gray-600/5 dark:shadow-gray-500/5': !isInTop,
                }
            )}
            initial="visible"
        >
            {/* LOGO */}
            <div className="flex flex-initial items-center">
                <Link href="/" className="inline-block">
                    <img src="/images/logo.png" className="h-11 w-auto" alt="logo" />
                </Link>
            </div>

            <MobileMenu platformGroup={platformGroup} nav={nav} />
        </header>
    );
}
