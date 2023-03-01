'use client';
import { motion } from 'framer-motion';

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function FollowCard({ followInPlatform }) {
    return (
        <motion.a
            target="_blank"
            rel="noopener noreferrer"
            href={followInPlatform.link}
            className="m-4 max-w-[310px] rounded-2xl bg-bg-light p-8 hover:ring-1 hover:ring-primary sm:max-w-full"
            variants={item}
        >
            <div
                className="flex h-[60px] w-[60px] items-center justify-center rounded-full"
                style={{ backgroundColor: followInPlatform.color }}
            >
                <div
                    className="icon h-6 w-6 text-white"
                    dangerouslySetInnerHTML={{
                        __html: followInPlatform.icon,
                    }}
                ></div>
            </div>

            <div className="mt-4">
                <div className="text-xl font-bold text-text-semidark">{followInPlatform.heading}</div>
                {/* <div className="mt-1">{followInPlatform.description}</div> */}
                <div className="mt-1">
                    {'Become an advanced, co n ' +
                        followInPlatform.heading +
                        ' ' +
                        followInPlatform.heading +
                        ' ' +
                        followInPlatform.heading +
                        ' JavaScript developer from scratch' +
                        followInPlatform.heading}
                </div>
            </div>
        </motion.a>
    );
}
