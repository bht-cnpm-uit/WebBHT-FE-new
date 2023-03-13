import { Suspense } from 'react';
import BannerSection from './components/BannerSection';
import BlogList, { BlogListSkeleton } from './components/BlogList';
import CategoryBar from './components/CategoryBar';
import { CategoryBarSkeleton } from './components/CategoryBar';

export default async function ({ searchParams }) {
    return (
        <>
            <BannerSection />
            <Suspense fallback={<CategoryBarSkeleton />}>
                <CategoryBar />
            </Suspense>
            <Suspense key={searchParams?.category} fallback={<BlogListSkeleton />}>
                <BlogList categoryId={searchParams?.category} />
            </Suspense>
        </>
    );
}
