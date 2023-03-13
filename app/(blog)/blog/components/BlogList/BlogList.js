import { getImageFromProperty } from '~/utils/notionTool';
import BlogCard, { BlogCardSkeleton } from '../BlogCard';

async function fetchCategories() {
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
            id: page?.id,
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

async function fetchAccounts() {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.ACCOUNT_BLOG_BD_ID}/query`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            cache: 'no-store',
        });
        const data = await res.json();
        const accounts = data?.results?.map((page) => ({
            id: page?.id,
            name: page?.properties?.name?.title?.[0]?.plain_text,
            avatar: getImageFromProperty(page?.properties?.avatar),
        }));
        return accounts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function fetchData(categoryId) {
    try {
        const res = await fetch(`${process.env.NOTION_API}/databases/${process.env.BLOG_DB_ID}/query`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: 'createdAt',
                        direction: 'descending',
                    },
                ],
                filter: categoryId && {
                    property: 'categories',
                    relation: {
                        contains: categoryId,
                    },
                },
            }),
            cache: 'no-store',
        });
        const data = await res.json();
        const categories = await fetchCategories();
        const accounts = await fetchAccounts();
        const blogsRaw = data?.results?.map((page) => ({
            id: page?.id?.split('-').join(''),
            title: page?.properties?.title?.title?.[0]?.plain_text,
            cover: page?.cover?.external?.url,
            description: page?.properties?.description?.email || '',
            categories: page?.properties?.categories?.relation?.map((category) => category.id),
            author: page?.properties?.author?.relation?.[0]?.id,
            createdAt: page?.properties?.createdAt?.created_time,
        }));
        const blogs = blogsRaw?.map((blog) => ({
            ...blog,
            categories: categories?.filter((category) => blog.categories.includes(category.id)),
            author: accounts?.find((account) => account.id === blog.author),
        }));
        return blogs;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function BlogListSkeleton() {
    return (
        <div className="px-p-body xs:px-0">
            <div className="mx-auto max-w-[800px] space-y-3 xs:space-x-5">
                {[1, 2, 3]?.map((index) => (
                    <BlogCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export default async function BlogList({ categoryId }) {
    const blogs = await fetchData(categoryId);
    return (
        <div className="px-p-body xs:px-0">
            <div className="mx-auto max-w-[800px] space-y-3 xs:space-x-5">
                {blogs?.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                ))}
            </div>
        </div>
    );
}
