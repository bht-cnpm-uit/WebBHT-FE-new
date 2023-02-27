async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.FOOTER_CONTACT_BD_ID}/query`, {
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
        const contacts = data?.results?.map((page) => ({
            name: page?.properties?.name?.title?.[0]?.plain_text || null,
            link: page?.properties?.link?.email || '',
        }));
        return contacts;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export default async function FooterContact() {
    const contacts = await fetchData();
    return (
        <div className="md:text-center">
            <p className="font-bold">Liên hệ</p>
            <div className="mt-1">
                {contacts?.map((contact, index) =>
                    contact.link ? (
                        <a key={index} href={contact.link} className="block py-1 hover:text-primary">
                            {contact.name}
                        </a>
                    ) : (
                        <div key={index} className="py-1">
                            {contact.name}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
