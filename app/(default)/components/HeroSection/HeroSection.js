import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';
import ButtonInHero from './ButtonInHero';
import HeroClient from './HeroClient';

async function fetchData() {
    try {
        const heroHeadingAndDescription = {
            heading: '',
            description: [],
        };
        let res = await fetch(`${process.env.NOTION_API}/blocks/${process.env.HERO_PAGE_ID}`, {
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Notion-Version': process.env.NOTION_VERSION,
            },
            next: { revalidate: 5 },
        });
        const blockRes = await res.json();
        heroHeadingAndDescription.heading = blockRes?.child_page?.title;

        res = await fetch(`${process.env.NOTION_API}/blocks/${process.env.HERO_PAGE_ID}/children?page_size=100`, {
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Notion-Version': process.env.NOTION_VERSION,
            },
            next: { revalidate: 5 },
        });
        const blockWithchilren = await res.json();
        heroHeadingAndDescription.description = blockWithchilren?.results || [];
        return heroHeadingAndDescription;
    } catch (err) {
        console.log(err);
        return {
            heading: '',
            description: [],
        };
    }
}

export default async function HeroSection() {
    const heroHeadingAndDescription = await fetchData();
    return <HeroClient heroHeadingAndDescription={heroHeadingAndDescription} buttonInHero={<ButtonInHero />} />;
}
