'use client';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';
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
                            __html: heading.heading,
                        }}
                    ></h2>
                    <h3 className="text-lg sm:text-base">{heading.description}</h3>
                </motion.header>
                <div className="mt-24 space-y-20">
                    {activities?.map((activity, index) => (
                        <div
                            key={index}
                            className={clsx('flex sm:my-14 sm:flex-col', {
                                'flex-row-reverse sm:flex-col': index % 2 !== 0,
                            })}
                        >
                            <motion.div
                                className="w-2/5 sm:mb-4 sm:w-full"
                                initial={{ x: index % 2 !== 0 ? 150 : -150, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <img
                                    src={activity.image}
                                    className="aspect-[3/2] w-full rounded-lg object-cover md:aspect-square sm:aspect-video xs:rounded-none"
                                />
                            </motion.div>
                            <motion.div
                                className={clsx('flex-1 space-y-2 xs:px-p-body', {
                                    'mr-8 md:mr-4 sm:mr-0': index % 2 !== 0,
                                    'ml-8 md:ml-4 sm:ml-0': index % 2 === 0,
                                })}
                                initial={{ x: index % 2 !== 0 ? -150 : 150, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="mb-3 text-2xl font-bold text-primary">{activity.heading}</h3>
                                <div className="text-lg md:text-base">
                                    <ParseNotionPageContent>{activity.content}</ParseNotionPageContent>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
