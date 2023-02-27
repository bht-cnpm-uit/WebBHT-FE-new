import clsx from 'clsx';
import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';
import { getImageFromProperty } from '~/utils/notionTool';

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
    return (
        <div className="px-p-body py-10 xs:px-0">
            <div className="mx-auto max-w-container xs:max-w-none">
                <header className="w-full text-center">
                    <h2
                        className="heading-section"
                        dangerouslySetInnerHTML={{
                            __html: 'Hoạt động nổi bật của <gradient-text>Ban học tập</gradient-text>',
                        }}
                    ></h2>
                </header>
                <div className="mt-16 space-y-20">
                    {activities?.map((activity, index) => (
                        <div
                            key={index}
                            className={clsx('flex sm:my-14 sm:flex-col', {
                                'flex-row-reverse sm:flex-col': index % 2 !== 0,
                            })}
                        >
                            <div className="w-2/5 sm:mb-4 sm:w-full">
                                <img
                                    src={activity.image}
                                    className="aspect-[3/2] w-full rounded-lg object-cover md:aspect-square sm:aspect-video xs:rounded-none"
                                />
                            </div>
                            <div
                                className={clsx('flex-1 space-y-2 xs:px-p-body', {
                                    'mr-8 md:mr-4 sm:mr-0': index % 2 !== 0,
                                    'ml-8 md:ml-4 sm:ml-0': index % 2 === 0,
                                })}
                            >
                                <h3 className="mb-3 text-2xl font-bold text-primary">{activity.heading}</h3>
                                <div className="text-lg md:text-base">
                                    <ParseNotionPageContent>{activity.content}</ParseNotionPageContent>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
