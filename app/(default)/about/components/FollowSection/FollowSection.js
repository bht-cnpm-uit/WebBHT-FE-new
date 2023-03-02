import FollowSectionClient from './FollowSectionClient';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.FOLLOW_DB_ID}/query`, {
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

async function fetchHeading() {
    try {
        const res = await fetch(
            `${process.env.NOTION_API}/databases/${process.env.HEADING_IN_ABOUT_PAGE_DB_ID}/query`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                    'Content-Type': 'application/json',
                    'Notion-Version': process.env.NOTION_VERSION,
                },
                body: JSON.stringify({
                    filter: {
                        property: 'key',
                        email: { equals: 'follow-section' },
                    },
                }),
                next: { revalidate: 5 },
            }
        );
        const data = await res.json();
        const page = data?.results?.[0];
        const heading = {
            heading:
                page?.properties?.heading?.title?.[0]?.plain_text ||
                'Theo dõi <gradient-text>Ban học tập</gradient-text> trên các nền tảng, mạng xã hội',
            description: page?.properties?.description?.email || '',
        };
        return heading;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function FollowSection() {
    const [followInPlatforms, heading] = await Promise.all([fetchData(), fetchHeading()]);
    return <FollowSectionClient followInPlatforms={followInPlatforms} heading={heading} />;
}
