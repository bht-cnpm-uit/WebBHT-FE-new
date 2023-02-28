import FollowSectionClient from './FollowSectionClient';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/81b7f75cc36f43f68aab5de516b48095/query`, {
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
        const followInPlatforms = data?.results?.map((page) => ({
            heading: page?.properties?.heading?.title?.[0]?.plain_text,
            description: page?.properties?.description?.email || '',
            icon: page?.properties?.icon?.email || '',
            color: page?.properties?.color?.email || '',
            link: page?.properties?.link?.email || '',
        }));
        return followInPlatforms;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function FollowSection() {
    const followInPlatforms = await fetchData();
    return <FollowSectionClient followInPlatforms={followInPlatforms} />;
}
