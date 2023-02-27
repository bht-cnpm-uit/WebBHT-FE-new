import Button from '~/app/components/Button';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.BUTTON_IN_HOMEPAGE_DB_ID}/query`, {
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
        const buttonInHeros = data?.results?.map((page) => ({
            name: page?.properties?.name?.title?.[0]?.plain_text || null,
            link: page?.properties?.link?.rich_text?.[0]?.plain_text || '',
            outline: page?.properties?.outline?.checkbox,
        }));
        return buttonInHeros;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export default async function ButtonInHero() {
    const buttonInHeros = await fetchData();
    return (
        <div className="flex space-x-3">
            {buttonInHeros?.map((btn, index) => (
                <Button key={index} href={btn?.link || '/'} lg outline={btn.outline}>
                    {btn.name}
                </Button>
            ))}
        </div>
    );
}
