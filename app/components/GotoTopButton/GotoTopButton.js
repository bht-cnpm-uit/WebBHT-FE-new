'use client';
import { motion, useAnimationControls, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function GotoTopButton() {
    const { scrollY } = useScroll();
    const controls = useAnimationControls();
    const canHidden = useRef(true);
    const canVisible = useRef(true);
    useMotionValueEvent(scrollY, 'change', (val) => {
        if (val > 400 && canVisible.current) {
            controls.start('visible');
            canVisible.current = false;
            canHidden.current = true;
        } else if (val <= 400 && canHidden.current) {
            controls.start('hidden');
            canHidden.current = false;
            canVisible.current = true;
        }
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <motion.button
            className="fixed right-4 bottom-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary-to/80 text-white"
            whileHover={{
                y: -3,
            }}
            initial="visible"
            animate={controls}
            transition={{ duration: 0.3 }}
            variants={{
                visible: { x: '0px' },
                hidden: { x: '80px' },
            }}
            onClick={() => scrollToTop()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-8 w-8"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </motion.button>
    );
}
