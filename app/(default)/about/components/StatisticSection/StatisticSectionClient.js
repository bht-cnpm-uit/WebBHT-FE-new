'use client';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0,
            staggerChildren: 0.2,
        },
    },
};

const itemVariant = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function StatisticSectionClient({ statistics }) {
    return (
        <div className="bg-bg-light px-p-body py-10">
            <motion.div
                className="mx-auto mt-8 max-w-container"
                variants={container}
                initial="hidden"
                whileInView="visible"
            >
                {/* <header className="w-full text-center">
                    <h2 className="text-3xl font-semibold uppercase text-primary">BAN HỌC TẬP</h2>
                </header> */}
                <div className="flex flex-wrap justify-center">
                    {statistics?.map((item, index) => (
                        <motion.div key={index} className="w-64 p-4 sm:w-56" variants={itemVariant}>
                            <div className="gradient-text text-center text-6xl font-bold  sm:text-5xl">
                                <CountUp from={0} to={item.number || 0} duration={1.5} isOver={item.plus} />
                            </div>
                            <p className="mt-3 text-center text-lg text-text sm:mt-2 sm:text-base">{item.content}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
