import Link from 'next/link';

export default function FooterShortLink() {
    return (
        <div className="md:text-center">
            <p className="font-bold">Truy cập nhanh</p>
            <div className="mt-1">
                <Link href="/" className="block py-1 hover:text-primary">
                    Trang chủ
                </Link>
                <Link href="/about" className="block py-1 hover:text-primary">
                    Giới thiệu
                </Link>
                <Link href="/document" className="block py-1 hover:text-primary">
                    Tài liệu
                </Link>
            </div>
        </div>
    );
}
