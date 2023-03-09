import { Suspense } from 'react';
import BannerSection from './components/BannerSection';
import BlogList from './components/BlogList';
import CategoryBar from './components/CategoryBar';

export default function () {
    return (
        <>
            <BannerSection />
            <Suspense fallback={<div>Loading</div>}>
                <CategoryBar />
            </Suspense>
            <Suspense fallback={<div>Loading</div>}>
                <BlogList />
            </Suspense>
        </>
    );
}
