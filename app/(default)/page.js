import HeroSection from './components/HeroSection';
import ImageSlide from './components/ImageSlide';

export default function Home() {
    return (
        <>
            {/* Hero section */}
            <div className="bg-bg px-p-body sm:px-0">
                <div className="mx-auto flex max-w-container items-center space-x-14 py-16 md:flex-col">
                    {/* CONTENT */}
                    <HeroSection />

                    {/* SLIDE */}
                    <ImageSlide />
                </div>
            </div>
        </>
    );
}
