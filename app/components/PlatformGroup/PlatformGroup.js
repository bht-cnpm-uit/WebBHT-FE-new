import shadeColor from '~/utils/shadeColor';
import Button from '../Button';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.PLATFORM_GROUP_DB_ID}/query`, {
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
        const platforms = data?.results?.map((page) => ({
            name: page?.properties?.name?.title?.[0]?.plain_text || null,
            icon: page?.properties?.icon?.url || '',
            link: page?.properties?.link?.url || '',
            color: page?.properties?.color?.url || '',
            colorDark: shadeColor(page?.properties?.color?.url, -10),
        }));
        return platforms;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function PlatformGroup() {
    const platforms = await fetchData();

    return (
        <div className="flex space-x-2">
            {platforms?.map((platform, index) => (
                <a
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={platform.link}
                    id={'platform-btn-' + index}
                    className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full transition-colors"
                >
                    <style>{`
                            #platform-btn-${index} {
                                background-color: ${platform.color};
                            }
                            #platform-btn-${index}:hover {
                                background-color: ${platform.colorDark};
                            }
                        `}</style>
                    <div
                        className="icon h-4 w-4 text-white"
                        dangerouslySetInnerHTML={{
                            __html: platform.icon,
                        }}
                    ></div>
                </a>
            ))}
        </div>
    );
}
