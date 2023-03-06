'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function GotoTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', scrollFunction);

        function scrollFunction() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                setShow(true);
            } else {
                setShow(false);
            }
        }
        return () => window.removeEventListener('scroll', scrollFunction);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={clsx(
                'fixed right-4 bottom-20 z-[10] flex h-14 w-14 translate-x-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary-to/80 text-white transition-transform',
                {
                    '!translate-x-0': show,
                }
            )}
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
        </button>
    );
}
