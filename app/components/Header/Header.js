'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useMotionValueEvent, motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import NavLink from '../NavLink';
import MobileMenu from './MobileMenu';
import DesktopNav from './DesktopNav';

export default function Header({ platformGroup }) {
    const [isInTop, setIsInTop] = useState(true);
    const { scrollY } = useScroll();

    const headerHeight = useTransform(scrollY, [0, 50], ['90px', '64px']);

    // const controls = useAnimationControls();
    // const delta = useRef(0);
    // const lastScrollY = useRef(0);
    useMotionValueEvent(scrollY, 'change', (val) => {
        // const diff = Math.abs(val - lastScrollY.current);
        // if (val >= lastScrollY.current) {
        //     delta.current = delta.current >= 10 ? 10 : delta.current + diff;
        // } else {
        //     delta.current = delta.current <= -10 ? -10 : delta.current - diff;
        // }

        // if (delta.current >= 10 && val > 200) {
        //     controls.start('hidden');
        // } else if (delta.current <= -10 || val < 200) {
        //     controls.start('visible');
        // }
        if (val > 100) {
            setIsInTop(false);
        } else {
            setIsInTop(true);
        }
        // lastScrollY.current = val;
    });

    return (
        <motion.header
            className={clsx(
                'fixed top-0 z-header flex w-full items-center justify-between bg-bg px-p-body transition-shadow duration-300',
                {
                    'border-gray-200 shadow-lg shadow-gray-600/5 dark:shadow-gray-500/5': !isInTop,
                }
            )}
            initial="visible"
            // animate={controls}
            // transition={{ duration: 0.2 }}
            // variants={{
            //     visible: { y: '0px' },
            //     hidden: { y: '-90px' },
            // }}
            style={{
                height: headerHeight,
            }}
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
        </motion.header>
    );
}
