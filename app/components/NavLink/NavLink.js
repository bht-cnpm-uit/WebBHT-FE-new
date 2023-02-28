'use client';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

function NavLink({ href, exact = true, children, ...props }) {
    const pathname = usePathname();
    const isActive = exact ? pathname?.split('/')[1] === href.split('/')[1] : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href} {...props}>
            {typeof children === 'function' ? children({ isActive }) : children}
        </Link>
    );
}

export default NavLink;
