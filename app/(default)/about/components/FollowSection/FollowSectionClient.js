'use client';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function FollowSectionClient({ followInPlatforms }) {
    return (
        <div className="overflow-hidden px-p-body py-10">
            <motion.div
                className="mx-auto max-w-container xs:max-w-none"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 1 }}
            >
                <header className="w-full text-center">
                    <h2
                        className="heading-section"
                        dangerouslySetInnerHTML={{
                            __html: 'Theo dõi <gradient-text>Ban học tập</gradient-text> trên các nền tảng, mạng xã hội',
                        }}
                    ></h2>
                </header>
            </motion.div>
            <motion.div
                className="my-6 -mx-5 flex flex-wrap justify-center xs:mx-0"
                variants={container}
                initial="hidden"
                whileInView="visible"
            >
                {followInPlatforms?.map((followInPlatform, index) => (
                    <motion.a
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        href={followInPlatform.link}
                        className={clsx(
                            'group flex w-[20rem] cursor-pointer flex-col items-center p-5 sm:w-[18rem] xs:w-full xs:items-start xs:px-0 xs:py-7',
                            {
                                'xs:flex-row': index % 2 === 0,
                                'xs:flex-row-reverse': index % 2 !== 0,
                            }
                        )}
                        variants={item}
                    >
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-bg-light transition xs:!bg-transparent">
                            <div
                                className="icon h-16 w-16"
                                style={{ color: followInPlatform.color }}
                                dangerouslySetInnerHTML={{
                                    __html: followInPlatform.icon,
                                }}
                            ></div>
                        </div>
                        <div
                            className={clsx('flex flex-col items-center  xs:flex-1', {
                                'xs:ml-4': index % 2 === 0,
                                'xs:mr-4': index % 2 !== 0,
                            })}
                        >
                            <div className="mt-4 text-center text-lg font-bold transition group-hover:text-primary xs:mt-0 xs:w-full xs:text-left">
                                {followInPlatform.heading}
                            </div>
                            <div className="mt-1 text-center xs:text-left">{followInPlatform.description}</div>
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}
