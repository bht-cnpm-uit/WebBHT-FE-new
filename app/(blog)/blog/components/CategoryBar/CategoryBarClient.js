'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryBarClient({ categories = [] }) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    return (
        <div className="px-p-body">
            <div className="mx-auto flex max-w-[800px] flex-wrap items-center py-3">
                <Link
                    href="/blog"
                    className={clsx(
                        'mx-3 inline-flex min-w-[80px] justify-center rounded-full px-4 py-2 font-semibold',
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
                            'mx-3 inline-flex min-w-[80px] justify-center rounded-full px-4 py-2 font-semibold',
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
