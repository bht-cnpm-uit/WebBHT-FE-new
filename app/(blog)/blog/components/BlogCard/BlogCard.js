import moment from 'moment';
import Link from 'next/link';

export function BlogCardSkeleton() {
    return (
        <div className="py-3">
            <div className="flex xs:flex-col-reverse">
                <div className="flex-1 pr-3 xs:pr-p-body xs:pl-p-body xs:pt-3">
                    <div className="flex items-center">
                        <div className="skeleton h-8 w-8 rounded-full" />
                        <p className="skeleton ml-3 h-5 w-[100px] rounded-lg" />
                    </div>
                    <h2 className="skeleton my-3 h-8 w-2/3 rounded-lg sm:h-7" />
                    <p className="skeleton my-1 h-5 w-full rounded-lg" />
                    <p className="skeleton my-1 h-5 w-1/2 rounded-lg" />
                    <div className="mt-2 flex items-center">
                        <div className="skeleton h-4 w-[100px] rounded-lg" />
                        <div className="ml-3 flex items-center space-x-2">
                            {[1, 2].map((index) => (
                                <div key={index} className="skeleton h-6 w-16 rounded-md" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex w-1/3 max-w-[260px] items-center xs:w-full xs:min-w-[150px] xs:max-w-none">
                    <div className="skeleton aspect-[4/3] w-full rounded-lg object-cover xs:aspect-[9/6] xs:rounded-none" />
                </div>
            </div>
        </div>
    );
}

export default function BlogCard({ blog }) {
    return (
        <Link href={'/blog/' + blog.id} className="block cursor-pointer py-3">
            <div className="flex xs:flex-col-reverse">
                <div className="flex-1 pr-3 xs:pr-p-body xs:pl-p-body xs:pt-3">
                    <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full bg-bg-light object-cover" src={blog?.author?.avatar} />
                        <p className="ml-3 font-semibold text-text-semidark">{blog?.author?.name}</p>
                    </div>
                    <h2 className="my-2 text-2xl font-bold text-text-dark sm:text-xl">{blog?.title}</h2>
                    <p>{blog?.description}</p>
                    <div className="mt-2 flex items-center">
                        <div className="text-sm">{moment(blog?.createdAt).format('DD/MM/YYYY')}</div>
                        <div className="ml-3 flex items-center space-x-2">
                            {blog?.categories?.map((category) => (
                                <div
                                    key={category?.id}
                                    className="rounded-md bg-primary py-0.5 px-3 text-sm font-medium text-white"
                                >
                                    {category?.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex w-1/3 max-w-[260px] items-center xs:w-full xs:min-w-[150px] xs:max-w-none">
                    <img
                        className="aspect-[4/3] w-full rounded-lg object-cover xs:aspect-[9/6] xs:rounded-none"
                        src={blog?.cover}
                    />
                </div>
            </div>
        </Link>
    );
}
