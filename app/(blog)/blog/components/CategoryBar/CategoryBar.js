import { Suspense } from 'react';
import CategoryBarClient from './CategoryBarClient';

async function fetchData() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.CATEGORIES_BLOG_DB_ID}/query`, {
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
            cache: 'no-store',
        });
        const data = await res.json();
        const categories = data?.results?.map((page) => ({
            id: page?.id?.split('-').join(''),
            name: page?.properties?.name?.title?.[0]?.plain_text,
            description: page?.properties?.description?.email || '',
            color: page?.properties?.color?.email || '',
        }));
        return categories;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function CategoryBarSkeleton() {
    return (
        <div className="flex justify-center px-p-body">
            <div className="-mx-2 flex max-w-[800px] flex-wrap items-center py-3">
                <div className="skeleton m-1 inline-flex h-[40px] w-[80px] justify-center rounded-full font-semibold "></div>
                <div className="skeleton m-1 inline-flex h-[40px] w-[80px] justify-center rounded-full font-semibold "></div>
                <div className="skeleton m-1 inline-flex h-[40px] w-[80px] justify-center rounded-full font-semibold "></div>
                <div className="skeleton m-1 inline-flex h-[40px] w-[80px] justify-center rounded-full font-semibold "></div>
            </div>
        </div>
    );
}

export default async function CategoryBar() {
    const categories = await fetchData();
    return <CategoryBarClient categories={categories} />;
}
