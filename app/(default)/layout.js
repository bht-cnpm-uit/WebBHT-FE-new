import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import FacebookChatPlugin from '../components/FacebookChatPlugin';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '~/styles/globals.css';
import Script from 'next/script';

export const metadata = {
    title: 'BAN HỌC TẬP ĐOÀN KHOA CÔNG NGHỆ PHẦN MỀM',
    description: 'BAN HỌC TẬP ĐOÀN KHOA CÔNG NGHỆ PHẦN MỀM',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Script src="./highlightTextScript.js" async />
            <body className="w-screen overflow-x-hidden">
                {/* <FacebookChatPlugin /> */}
                <Header />
                <main className="w-full pt-h-header">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
