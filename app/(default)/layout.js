import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import FacebookChatPlugin from '../components/FacebookChatPlugin';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '~/styles/globals.css';
import Script from 'next/script';
import GotoTopButton from '../components/GotoTopButton';
import ScrollUp from '../components/ScrollUp';
import GetTheme from '../components/GetTheme';
import NavigationProgess from '../components/NavigationProgess/NavigationProgess';

export const metadata = {
    title: 'Ban học tập Công nghệ Phần mềm',
    description: 'Ban học tập Đoàn khoa Công nghệ Phần mềm',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/favicon.ico',
        },
    },
    openGraph: {
        title: 'Ban học tập Công nghệ Phần mềm',
        description: 'Ban học tập Đoàn khoa Công nghệ Phần mềm',
        siteName: 'Ban học tập Công nghệ Phần mềm',
        images: [
            {
                url: '/images/thumbnail.jpg',
                width: 800,
                height: 600,
            },
        ],
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Script src="./highlightTextScript.js" async />
            <body className="w-full overflow-hidden">
                <GetTheme />
                <NavigationProgess />
                <ScrollUp />
                {/* <FacebookChatPlugin /> */}
                <Header />
                <main className="w-full pt-h-header md:pt-h-header-small">{children}</main>
                <Footer />
                <GotoTopButton />
            </body>
        </html>
    );
}
