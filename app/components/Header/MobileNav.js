import NavLink from '../NavLink';

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

export default async function MobileNav() {
    const nav = await fetchData();
    return (
        <nav className="mt-h-header-small flex flex-col">
            {nav.map((menu, index) => (
                <NavLink
                    key={index}
                    href={menu.link}
                    className="w-full from-primary/30 to-primary-to/30 px-3 py-3 text-center font-semibold text-text-semidark hover:bg-bg-light [&.active]:bg-gradient-to-r"
                >
                    {menu.name}
                </NavLink>
            ))}
        </nav>
    );
}
