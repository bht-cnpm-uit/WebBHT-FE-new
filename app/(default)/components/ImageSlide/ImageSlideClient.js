'use client';

import 'swiper/css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ImageSlideClient({ slideImages }) {
    // console.log(slideImages);

    const swiperRef = useRef(null);

    // Thay thế cho autoplay (vì autoplay của swiper có bug), NÓ CHẠY TỐT, ĐỪNG ĐỘNG VÀO
    useEffect(() => {
        const timeoutId = setInterval(() => {
            swiperRef.current.swiper.slideNext();
        }, 5000);
        return () => {
            clearInterval(timeoutId);
        };
    }, []);
    return (
        <div className="relative max-h-fit w-1/2 md:mt-10 md:w-full ">
            <Swiper
                className="aspect-video w-full overflow-hidden rounded-lg lg:aspect-[4/3] md:aspect-video sm:aspect-[4/3] sm:rounded-none"
                slidesPerView={1}
                loop={true}
                ref={swiperRef}
            >
                {slideImages?.map((slide, index) => (
                    <SwiperSlide key={index} className="">
                        <a target="_blank" rel="noopener noreferrer" href={slide.link} className="block h-full w-full">
                            <img src={slide.image} className="h-full w-full object-cover" />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                className="absolute left-0 top-1/2 z-40 h-11 w-11 -translate-y-1/2 -translate-x-1/2 rounded-full border border-gray-300 bg-white transition-colors hover:bg-gray-100 md:hidden"
                onClick={() => swiperRef.current.swiper.slidePrev()}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
                className="absolute right-0 top-1/2 z-40 h-11 w-11 -translate-y-1/2 translate-x-1/2 rounded-full border border-gray-300 bg-white transition-colors hover:bg-gray-100 md:hidden"
                onClick={() => swiperRef.current.swiper.slideNext()}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}
