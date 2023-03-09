'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryBarClient({ categories = [] }) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    return (
        <div className="flex justify-center px-p-body">
            <div className="-mx-2 flex max-w-[800px] flex-wrap items-center py-3">
                <Link
                    href="/blog"
                    className={clsx(
                        'm-1 inline-flex min-w-[80px] justify-center rounded-full bg-bg-light px-4 py-2 font-semibold',
                        {
                            'bg-primary text-white': !categoryParam,
                        }
                    )}
                >
                    Tất cả
                </Link>
                {categories?.map((category) => (
                    <Link
                        href={'/blog' + '?category=' + category.id}
                        key={category.id}
                        className={clsx(
                            'm-1 inline-flex min-w-[80px] justify-center rounded-full bg-bg-light px-4 py-2 font-semibold',
                            {
                                'bg-primary text-white': category.id === categoryParam,
                            }
                        )}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
