import '~/styles/globals.css';

export const metadata = {
    title: 'Blog | Ban học tập Công nghệ Phần mềm',
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
        title: 'Blog | Ban học tập Công nghệ Phần mềm',
        description: 'Ban học tập Đoàn khoa Công nghệ Phần mềm',
        siteName: 'Ban học tập Công nghệ Phần mềm',
        images: [
            {
                url: '/images/thumbnail.png',
            },
        ],
        type: 'website',
    },
};

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="w-full overflow-hidden">
                <header>HEADER</header>
                <main className="">{children}</main>
                <footer>FOOTER</footer>
            </body>
        </html>
    );
}
