import { motion } from 'framer-motion';
import MemberCard from './MemberCard';

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0,
        },
    },
};

const yearVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

const circleVariants = {
    hidden: {
        pathLength: 0,
    },
    visible: {
        pathLength: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};

const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: {
            duration: 0.3,
            delay: 0.5,
        },
    },
};

const membersVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.7,
            when: 'beforeChildren',
            staggerChildren: 0.07,
        },
    },
};

export default function MemberGroup({ members, groupTitle }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: '0px 0px -200px 0px' }}
            className="mt-10 w-full"
        >
            <div className="-ml-[15px] flex items-center">
                <div className="rounded-full text-primary">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        <motion.path
                            variants={circleVariants}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </motion.svg>
                </div>

                <motion.div variants={yearVariants} className="ml-7 text-4xl font-bold text-text-semidark">
                    {groupTitle}
                </motion.div>
            </div>

            <div className="flex items-stretch">
                <motion.div
                    variants={lineVariants}
                    style={{ originY: 0 }}
                    className="-my-2 w-0.5 rounded-full bg-gradient-to-b from-primary via-primary-to to-primary-to/0"
                ></motion.div>
                <motion.div variants={membersVariants} className="ml-7 mt-5 flex flex-1 flex-wrap">
                    {members?.map((member, index) => (
                        <MemberCard key={index} member={member} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
