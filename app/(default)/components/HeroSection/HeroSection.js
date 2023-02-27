import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';
import PlatformGroup from '~/app/components/PlatformGroup';
import ButtonInHero from './ButtonInHero';

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
    return (
        <div className="mr-7 w-1/2 space-y-6 md:w-full sm:px-p-body">
            <div>
                {/* HEADING */}
                <h2
                    className="text-5xl font-bold leading-tight text-text-dark xs:text-3xl"
                    dangerouslySetInnerHTML={{ __html: heroHeadingAndDescription?.heading }}
                ></h2>

                {/* Platform */}
                {/* <div className="mt-3">
                    <PlatformGroup />
                </div> */}
            </div>
            {/* DESCIPTION */}
            <div>
                <ParseNotionPageContent>{heroHeadingAndDescription.description || []}</ParseNotionPageContent>
            </div>

            {/* BUTTONS */}
            <ButtonInHero />
        </div>
    );
}
