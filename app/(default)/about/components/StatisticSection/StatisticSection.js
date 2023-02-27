import CountUp from './CountUpClient';

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
    return (
        <div className="bg-primary px-p-body py-10 text-white">
            <div className="mx-auto mt-8 max-w-container">
                {/* <header className="w-full text-center">
                    <h2 className="text-3xl font-semibold uppercase text-primary">BAN HỌC TẬP</h2>
                </header> */}
                <div className="flex flex-wrap justify-center">
                    {statistics?.map((item, index) => (
                        <div key={index} className="w-64 p-4 sm:w-56">
                            <p className="text-center text-5xl font-light sm:text-4xl sm:font-normal">
                                <CountUp end={item.number} duration={2.5} isCounting updateInterval={0.03} />
                                {item.plus ? '+' : ''}
                            </p>
                            <p className="mt-3 text-center text-gray-200 sm:mt-1">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
