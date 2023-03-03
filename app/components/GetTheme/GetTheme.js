'use client';

import { useEffect } from 'react';

export default function GetTheme() {
    useEffect(() => {
        const isDarkModeEnabled = () => {
            const savedTheme = typeof window !== 'undefined' && localStorage.getItem('theme');
            if (savedTheme !== null) {
                return savedTheme === 'dark';
            } else {
                const isDeviceDark =
                    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDeviceDark) {
                    typeof window !== 'undefined' && localStorage.setItem('theme', 'dark');
                } else {
                    typeof window !== 'undefined' && localStorage.setItem('theme', 'light');
                }
                return isDeviceDark;
            }
        };

        // const toggleTheme = () => {
        //     const html = document.documentElement;
        //     if (isDarkModeEnabled()) {
        //         html.classList.remove('dark');
        //         localStorage.setItem('theme', 'light');
        //     } else {
        //         html.classList.add('dark');
        //         localStorage.setItem('theme', 'dark');
        //     }
        // };

        // Set initial theme
        if (isDarkModeEnabled()) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return null;
}
