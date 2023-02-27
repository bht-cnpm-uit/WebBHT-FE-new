import { getImageFromProperty } from '~/utils/notionTool';
import ImageSlideClient from './ImageSlideClient';

async function fetchData() {
    try {
        const res = await fetch(
            `${process.env.NOTION_API}/databases/${process.env.IMAGE_SLIDE_IN_HOMEPAGE_DB_ID}/query`,
            {
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
            }
        );
        const slideRes = await res.json();
        const slideImages = slideRes?.results?.map((page) => ({
            link: page?.properties?.link?.email || '',
            image: getImageFromProperty(page?.properties?.images),
        }));
        return slideImages;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export default async function ImageSlide() {
    const slideImages = await fetchData();
    return <ImageSlideClient slideImages={slideImages} />;
}
