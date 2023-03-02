import Link from 'next/link';

export default function FooterShortLink() {
    return (
        <div className="flex min-w-[180px] flex-col md:mt-8 xs:items-center">
            <p className="text-lg font-bold text-text-semidark">Truy cập nhanh</p>
            <div className="mt-1 flex flex-col xs:text-center">
                <Link href="/" className="block py-1 can-hover:hover:text-primary">
                    Trang chủ
                </Link>
                <Link href="/about" className="block py-1 can-hover:hover:text-primary">
                    Giới thiệu
                </Link>
                <Link href="/document" className="block py-1 can-hover:hover:text-primary">
                    Tài liệu
                </Link>
            </div>
        </div>
    );
}
