import {groupByMap} from '~/utils/groupBy';
import MemberSectionClient from './MemberSectionClient';
import {readNotionFields, toMemberObjects} from "~/app/(default)/about/components/MemberSection/MemberParser";

async function fetchData() {
    try {
        console.log(process.env.MEMBERS_DB_ID_NEW);
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.MEMBERS_DB_ID_NEW}/query`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            body: JSON.stringify({
                /*sorts: [
                    {
                        property: 'year',
                        direction: 'ascending',
                    },
                    {
                        property: 'index',
                        direction: 'ascending',
                    },
                ],*/
            }),
            next: {revalidate: 5},
        });
        const response = await res.json();

        const data = readNotionFields(response.results);

        /*let members = data?.results?.map((page) => ({
            name: page?.properties?.name?.title?.[0]?.plain_text,
            year: Number(page?.properties?.year?.select?.name),
            image: getImageFromProperty(page?.properties?.images),
            role: page?.properties?.role?.select?.name || null,
        }));*/
        let members = toMemberObjects(data);

        members = groupByMap(members.sort((a, b) => {
                if (a.school_year !== b.school_year) return b.school_year - a.school_year;
                if (a.current_role_title !== b.current_role_title) return a.current_role_index - b.current_role_index;
                return 0;
            })
            , (member) => `Khóa ${member.school_year}`);
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
                next: {revalidate: 5},
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
    return <MemberSectionClient members={members} heading={heading}/>;
}
