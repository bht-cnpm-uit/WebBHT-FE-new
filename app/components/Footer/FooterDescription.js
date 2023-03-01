import ParseNotionPageContent from '../ParseNotionPageContent';

async function fetchData() {
    try {
        const res = await fetch(
            `${process.env.NOTION_API}/blocks/${process.env.FOOTER_DESCRIPTION_PAGE_ID}/children?page_size=100`,
            {
                headers: {
                    Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                    'Notion-Version': process.env.NOTION_VERSION,
                },
                next: { revalidate: 5 },
            }
        );
        const blockWithchilren = await res.json();
        const description = blockWithchilren?.results || [];
        return description;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export default async function FooterDescription() {
    const description = await fetchData();
    return (
        <div className="mr-4 flex flex-1 flex-col xs:mr-0 xs:items-center xs:text-center">
            <img src="/images/logo.png" className="h-9 w-9" />
            <div className="mt-2">
                {/* FETCH FORM NOTION */}
                <div className="flex flex-col">
                    <ParseNotionPageContent>{description}</ParseNotionPageContent>
                </div>
            </div>
        </div>
    );
}
