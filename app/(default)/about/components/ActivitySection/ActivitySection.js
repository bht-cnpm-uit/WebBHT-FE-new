import { getImageFromProperty } from '~/utils/notionTool';
import ActivitySectionClient from './ActivitySectionClient';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.ACTIVITES_DB_ID}/query`, {
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
        let activities = data?.results?.map((page) => ({
            heading: page?.properties?.heading?.title?.[0]?.plain_text || null,
            image: getImageFromProperty(page?.properties?.images),
            idPage: page?.id,
        }));

        let promiseFetchPage = activities.map(async (activity) => {
            try {
                const res = await fetch(`${process.env.NOTION_API}/blocks/${activity.idPage}/children?page_size=100`, {
                    headers: {
                        Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                        'Content-Type': 'application/json',
                        'Notion-Version': process.env.NOTION_VERSION,
                    },
                    next: { revalidate: 5 },
                });
                const data = await res.json();
                return { ...activity, content: data.results };
            } catch (error) {
                console.log(error);
                return error;
            }
        });
        activities = await Promise.all(promiseFetchPage);
        return activities;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function ActivitySection() {
    const activities = await fetchData();
    return <ActivitySectionClient activities={activities} />;
}
