import { Suspense } from 'react';
import BannerSection from './components/BannerSection';
import BlogList from './components/BlogList';
import CategoryBar from './components/CategoryBar';

export default async function ({ searchParams }) {
    return (
        <>
            <BannerSection />
            <Suspense fallback={<div>Loading</div>}>
                <CategoryBar />
            </Suspense>
            <Suspense key={searchParams?.category} fallback={<div>Loading</div>}>
                <BlogList categoryId={searchParams?.category} />
            </Suspense>
        </>
    );
}
