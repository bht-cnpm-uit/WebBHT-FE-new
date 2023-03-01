'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useMotionValueEvent, motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HeaderDesktop({ platformGroup, nav }) {
    const [isInTop, setIsInTop] = useState(true);
    const { scrollY } = useScroll();

    const headerHeight = useTransform(scrollY, [0, 50], ['90px', '64px']);
    const logoHeight = useTransform(scrollY, [0, 50], ['60px', '44px']);

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
                'fixed top-0 z-header flex w-full items-center justify-between bg-bg px-p-body transition-shadow duration-300 md:hidden',
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
                <Link href="/" className="inline-block h-full">
                    <motion.img src="/images/logo.png" className="w-auto" alt="logo" style={{ height: logoHeight }} />
                </Link>
            </div>

            {/* MENU */}
            {nav}

            {/* ACTION BUTTON GROUP */}
            <div className="flex flex-1 justify-end">{platformGroup}</div>
        </motion.header>
    );
}
