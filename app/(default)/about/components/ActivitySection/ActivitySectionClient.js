'use client';
import { motion } from 'framer-motion';
import ActivityItem from './ActivityItem';
export default function ActivitySectionClient({ activities, heading }) {
    return (
        <div className="px-p-body py-10 xs:px-0">
            <div className="mx-auto max-w-container xs:max-w-none">
                <motion.header
                    className="w-full text-center"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 1 }}
                >
                    <h2
                        className="heading-section"
                        dangerouslySetInnerHTML={{
                            __html: heading.heading || '',
                        }}
                    ></h2>
                    <h3 className="text-lg sm:text-base">{heading.description || ''}</h3>
                </motion.header>
                <div className="mt-24">
                    {activities?.map((activity, index) => (
                        <ActivityItem activity={activity} key={index} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
