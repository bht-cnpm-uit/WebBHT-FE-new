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

export default function FollowSectionClient({ followInPlatforms, heading }) {
    return (
        <div className="overflow-hidden px-p-body py-10">
            <div className="mx-auto max-w-container xs:max-w-none">
                <motion.header
                    className="w-full text-center"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 1 }}
                    viewport={{ margin: '0px 0px 50px 0px' }}
                >
                    <h2
                        className="heading-section"
                        dangerouslySetInnerHTML={{
                            __html: heading.heading,
                        }}
                    ></h2>
                    <h3 className="text-lg sm:text-base">{heading.description}</h3>
                </motion.header>
                <motion.div
                    className="my-9 -mx-3 flex flex-wrap justify-center xs:mx-0"
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
        </div>
    );
}
