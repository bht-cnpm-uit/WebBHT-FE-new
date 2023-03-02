import StatisticSectionClient from './StatisticSectionClient';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.STATISTICS_DB_ID}/query`, {
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
        const statistics = data?.results?.map((page) => ({
            number: page?.properties?.number?.number,
            content: page?.properties?.name?.title?.[0]?.plain_text,
            plus: page?.properties?.over?.checkbox,
        }));
        return statistics;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function StatisticSection() {
    const statistics = await fetchData();
    return <StatisticSectionClient statistics={statistics} />;
}
