import groupBy from '~/utils/groupBy';
import { getImageFromProperty } from '~/utils/notionTool';
import MemberCard from './MemberCard';
import MemberSectionClient from './MemberSectionClient';

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
                next: { revalidate: 5 },
            }
        );

        const data = await res.json();
        const page = data?.results?.find((page) => page.properties?.key?.email === 'member-section');
        const heading = page && {
            heading:
                page?.properties?.heading?.title?.[0]?.plain_text ||
                'Thành viên <gradient-text>Ban học tập</gradient-text>',
            description: page?.properties?.description?.email || '',
        };
        return heading;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function MemberSection() {
    const members = await fetchData();
    const heading = await fetchHeading();
    return <MemberSectionClient members={members} heading={heading} />;
}
