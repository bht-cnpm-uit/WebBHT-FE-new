import Link from 'next/link';
import NavLink from '../NavLink';
import PlatformGroup from '../PlatformGroup';
import MobileMenu from './MobileMenu';

const MENU = [
    {
        href: '/',
        content: 'Trang chủ',
    },
    {
        href: '/about',
        content: 'Giới thiệu',
    },
    {
        href: '/document',
        content: 'Tài liệu',
    },
];

export default function Header() {
    return (
        <header className="fixed z-header flex h-h-header w-full items-center justify-between bg-bg px-p-body shadow">
            {/* LOGO */}
            <div className="flex flex-1 items-center md:flex-initial">
                <Link href="/">
                    <img src="/images/logo.png" className="h-11 w-11" alt="logo" />
                </Link>
            </div>

            {/* MENU */}
            <nav className="md:hidden">
                {MENU.map((menu, index) => (
                    <NavLink
                        key={index}
                        href={menu.href}
                        className="px-3 py-2 font-semibold text-text-semidark hover:text-primary [&.active]:text-primary"
                    >
                        {menu.content}
                    </NavLink>
                ))}
            </nav>

            {/* ACTION BUTTON GROUP */}
            <div className="flex flex-1 justify-end md:hidden">
                <PlatformGroup />
            </div>

            {/* MOBILE GROUP */}
            <MobileMenu>
                <PlatformGroup />
            </MobileMenu>
        </header>
    );
}
