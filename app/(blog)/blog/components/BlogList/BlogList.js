import BlogCard from '../BlogCard';

export default async function BlogList() {
    return (
        <div className="px-p-body">
            <div className="mx-auto max-w-[800px]">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </div>
    );
}
