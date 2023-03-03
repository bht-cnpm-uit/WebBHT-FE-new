import BannerSectionClient from './BannerSectionClient';

async function fetchData() {
    try {
        const bannerHeadingAndDescription = {
            heading: '',
            description: [],
        };
        let res = await fetch(`${process.env.NOTION_API}/blocks/${process.env.BANNER_IN_ABOUT_PAGE_ID}`, {
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Notion-Version': process.env.NOTION_VERSION,
            },
            next: { revalidate: 5 },
        });
        const blockRes = await res.json();
        bannerHeadingAndDescription.heading = blockRes?.child_page?.title;

        res = await fetch(
            `${process.env.NOTION_API}/blocks/${process.env.BANNER_IN_ABOUT_PAGE_ID}/children?page_size=100`,
            {
                headers: {
                    Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                    'Notion-Version': process.env.NOTION_VERSION,
                },
                next: { revalidate: 5 },
            }
        );
        const blockWithchilren = await res.json();
        bannerHeadingAndDescription.description = blockWithchilren?.results || [];
        return bannerHeadingAndDescription;
    } catch (err) {
        console.log(err);
        return {
            heading: '',
            description: [],
        };
    }
}

export default async function BannerSection() {
    const { heading, description } = await fetchData();
    return <BannerSectionClient heading={heading} description={description} />;
}
