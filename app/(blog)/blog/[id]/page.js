import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';
import { getImageFromProperty } from '~/utils/notionTool';

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

async function fetchBlog(id) {
    try {
        const res = await fetch(`${process.env.NOTION_API}/pages/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            cache: 'no-store',
        });
        const page = await res.json();
        const blogRaw = {
            id: page?.id?.split('-').join(''),
            title: page?.properties?.title?.title?.[0]?.plain_text,
            cover: page?.cover?.external?.url,
            description: page?.properties?.description?.email || '',
            categories: page?.properties?.categories?.relation?.map((category) => category.id),
            author: page?.properties?.author?.relation?.[0]?.id,
            createdAt: page?.properties?.createdAt?.created_time,
        };
        return blogRaw;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function fetchBlogContent(id) {
    try {
        const res = await fetch(`${process.env.NOTION_API}/blocks/${id}/children?page_size=1000`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + process.env.NOTION_TOKEN,
                'Content-Type': 'application/json',
                'Notion-Version': process.env.NOTION_VERSION,
            },
            cache: 'no-store',
        });
        const block = await res.json();
        return block?.results || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function fetchData(id) {
    try {
        const [categories, accounts, blogRaw, blogContent] = await Promise.all([
            fetchCategories(),
            fetchAccounts(),
            fetchBlog(id),
            fetchBlogContent(id),
        ]);
        const blog = {
            ...blogRaw,
            categories: categories?.filter((category) => blogRaw.categories.includes(category.id)),
            author: accounts?.find((account) => account.id === blogRaw.author),
            content: blogContent,
        };
        return blog;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function DetailBlogPage({ params }) {
    const blog = await fetchData(params.id);
    return (
        <div className="px-p-body">
            <div className="mx-auto max-w-[800px] pt-10 text-[17px]">
                <h1 className="my-2 text-3xl font-bold text-text-dark">{blog.title}</h1>
                <ParseNotionPageContent>{blog.content}</ParseNotionPageContent>
            </div>
        </div>
    );
}