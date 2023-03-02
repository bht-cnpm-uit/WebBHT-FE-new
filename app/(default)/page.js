import HeroSection from './components/HeroSection';
import ImageSlide from './components/ImageSlide';

export default function Home() {
    return (
        <>
            {/* Hero section */}
            <div className="bg-bg px-p-body sm:px-0">
                <div className="mx-auto flex max-w-container items-center space-x-14 pt-8 pb-20 md:flex-col md:space-x-0 md:py-12">
                    {/* CONTENT */}
                    <HeroSection />

                    {/* SLIDE */}
                    <ImageSlide />
                </div>
            </div>
        </>
    );
}
