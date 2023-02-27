import groupBy from '~/utils/groupBy';
import { getImageFromProperty } from '~/utils/notionTool';
import MemberCard from './MemberCard';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.MEMBERS_DB_ID}/query`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: 'year',
                        direction: 'ascending',
                    },
                    {
                        property: 'index',
                        direction: 'ascending',
                    },
                ],
            }),
            next: { revalidate: 5 },
        });
        const data = await res.json();
        let members = data?.results?.map((page) => ({
            name: page?.properties?.name?.title?.[0]?.plain_text,
            year: Number(page?.properties?.year?.select?.name),
            image: getImageFromProperty(page?.properties?.images),
            role: page?.properties?.role?.select?.name || null,
        }));
        members = groupBy(members, 'year');
        return members;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export default async function MemberSection() {
    const members = await fetchData();
    return (
        <div className="px-p-body py-10">
            <div className="mx-auto max-w-container">
                <header className="w-full text-center">
                    <h2
                        className="heading-section"
                        dangerouslySetInnerHTML={{
                            __html: 'Thành viên của <gradient-text>Ban học tập</gradient-text>',
                        }}
                    ></h2>
                </header>
                <div className="mt-10 flex w-full flex-col items-center">
                    {Object.keys(members)
                        ?.sort((a, b) => Number(a) - Number(b))
                        ?.map((year, index) => (
                            <div key={index} className="mt-5 w-full">
                                <div className="mb-2 text-center text-3xl font-extrabold tracking-widest text-primary">
                                    {year}
                                </div>
                                <div className="relative">
                                    {/* LINE */}
                                    <div className="absolute top-0 bottom-0 left-1/2 w-0 border-r border-primary">
                                        <div className="absolute top-0 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-bg"></div>
                                    </div>

                                    {/* CARDS */}
                                    <div className="relative pt-8 pb-10">
                                        <div className="flex flex-wrap justify-center bg-bg py-1">
                                            {members?.[year]?.map((member, index) => (
                                                <MemberCard member={member} key={index} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
