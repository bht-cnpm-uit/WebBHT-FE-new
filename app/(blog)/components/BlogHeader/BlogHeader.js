import Link from 'next/link';

export default function BlogHeader() {
    return (
        <div className="fixed left-0 right-0 flex h-h-header-small items-center justify-between bg-bg-light px-p-body shadow dark:shadow-gray-800">
            <Link href="/blog" className="inline-block h-11">
                <img className="h-full" src="/images/logo.png" />
            </Link>

            <div>Search</div>
        </div>
    );
}
