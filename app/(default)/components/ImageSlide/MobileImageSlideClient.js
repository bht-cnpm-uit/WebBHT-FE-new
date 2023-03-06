'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useEffect, useRef } from 'react';
const IMAGES = [
    {
        id: 1,
        link: 'https://google.com',
        src: 'https://plus.unsplash.com/premium_photo-1666900050405-c6b2d1cc94df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    },
    {
        id: 2,
        link: 'https://google.com',
        src: 'https://plus.unsplash.com/premium_photo-1666899830344-f7f226af458f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
        id: 3,
        link: 'https://google.com',
        src: 'https://plus.unsplash.com/premium_photo-1669833449026-124965aa4d26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    {
        id: 4,
        link: 'https://google.com',
        src: 'https://plus.unsplash.com/premium_photo-1666899830344-f7f226af458f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
        id: 5,
        link: 'https://google.com',
        src: 'https://plus.unsplash.com/premium_photo-1669833449026-124965aa4d26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
];

export default function MobileImageSlideClient({ slideImages }) {
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
        <motion.div
            className="relative mt-10 hidden max-h-fit w-full md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
        >
            <Swiper
                className="h-[420px] w-full sm:rounded-none xs:h-[340px]"
                slidesPerView="auto"
                loop={true}
                spaceBetween={24}
                ref={swiperRef}
            >
                {IMAGES?.map((slide, index) => (
                    <SwiperSlide key={index} className="w-[370px] overflow-hidden rounded-xl xs:w-[300px]">
                        <a target="_blank" rel="noopener noreferrer" href={slide.link} className="block h-full w-full">
                            <img src={slide.src} className="h-full w-full object-cover" />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border bg-bg-light text-primary dark:border-gray-700"
                onClick={() => swiperRef.current.swiper.slidePrev()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-bg-light text-primary dark:border-gray-700"
                onClick={() => swiperRef.current.swiper.slideNext()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </motion.div>
    );
}
