'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const IMAGES = [
    {
        id: 1,
        src: 'https://plus.unsplash.com/premium_photo-1666900050405-c6b2d1cc94df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    },
    {
        id: 2,
        src: 'https://plus.unsplash.com/premium_photo-1666899830344-f7f226af458f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
        id: 3,
        src: 'https://plus.unsplash.com/premium_photo-1669833449026-124965aa4d26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
];

export default function ImageSlideClient({ slideImages }) {
    const [images, setImages] = useState(IMAGES);
    const classes = [
        {
            wrapper: 'absolute h-[300px] w-[264px] rotate-12 overflow-hidden rounded-2xl',
            overlay: 'absolute inset-0 bg-bg opacity-60',
        },
        {
            wrapper: 'absolute h-[356px] w-[314px] overflow-hidden rounded-2xl',
            overlay: 'absolute inset-0 bg-bg opacity-30',
        },
        {
            wrapper: 'absolute h-[420px] w-[370px] overflow-hidden rounded-2xl',
            overlay: 'absolute inset-0 bg-bg opacity-0',
        },
    ];

    const initialStyles = [
        {
            y: 60,
            x: 230,
            rotate: 12,
        },
        {
            y: 32,
            x: 116,
            rotate: 6,
        },
        {
            y: 0,
            x: 0,
            rotate: 0,
        },
    ];

    function handleNextSlide() {
        const images_temp = [...images];
        const temp = { ...images_temp[2] };
        images_temp[2] = { ...images_temp[1] };
        images_temp[1] = { ...images_temp[0] };
        images_temp[0] = temp;
        setImages(images_temp);
    }

    console.log(images);

    return (
        <div className="relative z-[1] h-[420px] w-1/2 shadow-test">
            {images.map((image, index) => (
                <motion.div
                    key={image.id}
                    layoutId={image.id}
                    className={classes[index].wrapper}
                    initial={initialStyles[index]}
                    animate={initialStyles[index]}
                    transition={{ duration: 2 }}
                >
                    <div className={classes[index].overlay}></div>
                    <img src={images[index].src} className="h-full w-full object-cover" />
                </motion.div>
            ))}
            <button className="absolute top-1/2 left-0 bg-white" onClick={() => handleNextSlide()}>
                Next
            </button>
        </div>
    );
}
