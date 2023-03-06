'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

export default function ImageSlideClient({ slideImages }) {
    const [images, setImages] = useState(slideImages);
    const [hover, setHover] = useState(false);
    const classes = [
        {
            wrapper: 'absolute block bg-bg-light h-[420px] w-[370px] overflow-hidden rounded-2xl',
            overlay: 'absolute inset-0 bg-bg opacity-0',
        },
        {
            wrapper: 'absolute block bg-bg-light h-[356px] w-[314px] overflow-hidden rounded-2xl hover:cursor-pointer ',
            overlay: 'absolute inset-0 bg-bg hover:opacity-0 transition-opacity opacity-30',
        },
        {
            wrapper: 'absolute block bg-bg-light h-[300px] w-[264px] overflow-hidden rounded-2xl hover:cursor-pointer ',
            overlay: 'absolute inset-0 bg-bg hover:opacity-0 transition-opacity opacity-50',
        },
        {
            wrapper: 'absolute block bg-bg-light h-[230px] w-[202px] overflow-hidden rounded-2xl hover:cursor-pointer ',
            overlay: 'absolute inset-0 bg-bg hover:opacity-0 transition-opacity opacity-70',
        },
    ];

    const initialStyles = [
        {
            y: 0,
            x: 0,
            rotate: 0,
        },
        {
            y: 32,
            x: 116,
            rotate: 6,
        },
        {
            y: 60,
            x: 230,
            rotate: 12,
        },
        {
            y: 110,
            x: 340,
            rotate: 18,
        },
    ];

    useEffect(() => {
        const timout = setTimeout(() => {
            !hover && handleNextSlide();
        }, 4000);
        return () => {
            clearTimeout(timout);
        };
    }, [images, hover]);

    function handleNextSlide() {
        if (images.length === 0) return;
        const images_temp = [...images];
        images_temp.push(images_temp.shift());
        setImages(images_temp);
    }

    function handlePrevSlide() {
        if (images.length === 0) return;
        const images_temp = [...images];
        images_temp.unshift(images_temp.pop());
        setImages(images_temp);
    }

    function handleSlideTo(index) {
        if (images.length === 0) return;
        const leftArray = images.slice(0, index);
        const rightArray = images.slice(index, images.length);
        setImages([...rightArray, ...leftArray]);
    }

    return (
        <motion.div
            className="relative z-[1] h-[420px] w-1/2 pl-10 lg:pl-0 md:hidden"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
        >
            {images
                .map((image, index) => {
                    const indexData = index <= 2 ? index : 3;
                    return (
                        <motion.div
                            key={image?.id}
                            layoutId={image?.id}
                            className={classes[indexData].wrapper}
                            initial={initialStyles[indexData]}
                            animate={initialStyles[indexData]}
                            transition={{ type: 'spring', damping: 10, mass: 0.8, stiffness: 100 }}
                            whileHover={{
                                scale: index !== 0 ? 1.05 : 1,
                            }}
                            onClick={() => index !== 0 && handleSlideTo(index)}
                            onMouseEnter={() => index == 0 && setHover(true)}
                            onMouseLeave={() => index == 0 && setHover(false)}
                        >
                            {index === 0 ? (
                                <a
                                    href={image?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes[indexData].overlay}
                                ></a>
                            ) : (
                                <div className={classes[indexData].overlay}></div>
                            )}
                            {/* <LazyLoadImage
                                alt={'fadsf'}
                                height={420}
                                width={370}
                                effect="blur"
                                src={images[indexData]?.src} // use normal <img> attributes as props
                            /> */}
                            <img src={images[indexData]?.src} className="h-full w-full object-cover" />
                            {/* <Image src={images[indexData]?.src} height={420} width={370} placeholder="blur" /> */}
                        </motion.div>
                    );
                })
                .reverse()}

            <div className="absolute top-full left-0 right-0 mt-2 flex items-center justify-center space-x-3">
                <button className="rounded-full bg-bg-light p-2 hover:text-primary" onClick={() => handlePrevSlide()}>
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
                <button className="rounded-full bg-bg-light p-2 hover:text-primary" onClick={() => handleNextSlide()}>
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
            </div>
        </motion.div>
    );
}
