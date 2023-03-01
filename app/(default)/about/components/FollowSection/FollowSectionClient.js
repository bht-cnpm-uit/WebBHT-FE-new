'use client';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import FollowCard from './FollowCard';

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

export default function FollowSectionClient({ followInPlatforms }) {
    return (
        <div className="overflow-hidden px-p-body py-10">
            <motion.div
                className="mx-auto max-w-container xs:max-w-none"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 1 }}
                viewport={{ margin: '0px 0px 50px 0px' }}
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
                className="my-9 -mx-4 flex flex-wrap justify-center xs:mx-0"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: '0px 0px 100px 0px' }}
            >
                {followInPlatforms?.map((followInPlatform, index) => (
                    <FollowCard followInPlatform={followInPlatform} key={index} />
                ))}
            </motion.div>
        </div>
    );
}
