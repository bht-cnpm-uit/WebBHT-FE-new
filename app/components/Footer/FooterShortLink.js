import Link from 'next/link';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.NAV_DB_ID}/query`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: 'index',
                        direction: 'ascending',
                    },
                ],
            }),
            next: { revalidate: 5 },
        });
        const data = await res.json();
        const nav = data?.results?.map((page) => ({
            name: page?.properties?.name?.title?.[0]?.plain_text || null,
            link: page?.properties?.link?.email || '/',
        }));
        return nav;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function FooterShortLink() {
    const nav = await fetchData();
    return (
        <div className="flex min-w-[180px] flex-col md:mt-8 xs:items-center">
            <p className="text-lg font-semibold text-text-semidark">Truy cập nhanh</p>
            <div className="mt-1 flex flex-col xs:text-center">
                {nav?.map((navItem) => (
                    <Link href={navItem.link} className="block py-1 can-hover:hover:text-primary">
                        {navItem.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
