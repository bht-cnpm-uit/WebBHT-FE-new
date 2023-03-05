'use client';
import { motion } from 'framer-motion';
import MemberCard from './MemberCard';
import MemeberGroup from './MemberGroup';

export default function MemberSectionClient({ members, heading }) {
    return (
        <div className="px-p-body py-20">
            <div className="mx-auto max-w-container">
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
                            __html: heading?.heading || '',
                        }}
                    ></h2>
                    <h3 className="text-lg sm:text-base">{heading?.description || ''}</h3>
                </motion.header>

                <div className="mx-auto mt-10 flex max-w-[767px] flex-col items-center">
                    {Object.keys(members)
                        ?.sort((a, b) => Number(a) - Number(b))
                        ?.map((year, index) => (
                            <MemeberGroup key={index} year={year} members={members?.[year]} />
                        ))}
                </div>
            </div>
        </div>
    );
}
