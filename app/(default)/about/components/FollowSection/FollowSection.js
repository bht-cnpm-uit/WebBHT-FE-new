import clsx from 'clsx';

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
    return (
        <div className="overflow-hidden px-p-body py-10">
            <div className="mx-auto max-w-container xs:max-w-none">
                <header className="w-full text-center">
                    <h2
                        className="heading-section"
                        dangerouslySetInnerHTML={{
                            __html: 'Theo dõi <gradient-text>Ban học tập</gradient-text> trên các nền tảng, mạng xã hội',
                        }}
                    ></h2>
                </header>
            </div>
            <div className="my-6 -mx-5 flex flex-wrap justify-center xs:mx-0">
                {followInPlatforms?.map((followInPlatform, index) => (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        href={followInPlatform.link}
                        className={clsx(
                            'group flex w-[20rem] cursor-pointer flex-col items-center p-5 sm:w-[18rem] xs:w-full xs:items-start xs:px-0 xs:py-7',
                            {
                                'xs:flex-row': index % 2 === 0,
                                'xs:flex-row-reverse': index % 2 !== 0,
                            }
                        )}
                    >
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-bg-light transition xs:!bg-transparent">
                            <div
                                className="icon h-16 w-16"
                                style={{ color: followInPlatform.color }}
                                dangerouslySetInnerHTML={{
                                    __html: followInPlatform.icon,
                                }}
                            ></div>
                        </div>
                        <div
                            className={clsx('flex flex-col items-center  xs:flex-1', {
                                'xs:ml-4': index % 2 === 0,
                                'xs:mr-4': index % 2 !== 0,
                            })}
                        >
                            <div className="mt-4 text-center text-lg font-bold transition group-hover:text-primary xs:mt-0 xs:w-full xs:text-left">
                                {followInPlatform.heading}
                            </div>
                            <div className="mt-1 text-center xs:text-left">{followInPlatform.description}</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
