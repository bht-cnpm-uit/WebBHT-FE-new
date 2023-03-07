import clsx from 'clsx';
import { motion } from 'framer-motion';
import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';

export default function ActivityItem({ activity, index }) {
    return (
        <>
            <div
                className={clsx('mb-20 flex items-stretch md:hidden', {
                    'flex-row-reverse': index % 2 !== 0,
                })}
            >
                <motion.div
                    className="flex w-[45%] max-w-[580px] items-center rounded-3xl"
                    initial={{ x: index % 2 !== 0 ? 150 : -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={activity.image} className="aspect-[9/6] w-full rounded-3xl bg-bg-light object-cover" />
                </motion.div>
                <motion.div
                    className={clsx('flex flex-1 flex-col justify-center', {
                        'mr-10': index % 2 !== 0,
                        'ml-10': index % 2 === 0,
                    })}
                    initial={{ x: index % 2 !== 0 ? -150 : 150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="mb-6 text-3xl font-bold text-text-dark">{activity.heading}</h3>
                    <div className="text-lg">
                        <ParseNotionPageContent>{activity.content}</ParseNotionPageContent>
                    </div>
                </motion.div>
            </div>

            {/* MOBILE */}
            <div className="mb-20 hidden md:block">
                <motion.div
                    className="bg-bg-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img
                        src={activity.image}
                        className="aspect-[9/6] w-full rounded-3xl object-cover xs:rounded-none"
                    />
                </motion.div>
                <motion.div
                    className="mt-5 xs:px-p-body"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="mb-4 text-3xl font-bold text-text-dark xs:text-2xl">{activity.heading}</h3>
                    <div className="text-lg xs:text-base">
                        <ParseNotionPageContent>{activity.content}</ParseNotionPageContent>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
