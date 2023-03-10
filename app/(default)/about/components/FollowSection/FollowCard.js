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
            className="m-3 block w-[310px] rounded-2xl bg-bg-light from-primary/10 to-primary-to/10 p-8 sm:w-full can-hover:hover:bg-gradient-to-br"
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
                <div className="mt-1">{followInPlatform.description}</div>
            </div>
        </motion.a>
    );
}
