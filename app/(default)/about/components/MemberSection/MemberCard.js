'use client';
import { motion } from 'framer-motion';
import { useId, useState } from 'react';

const memberVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    },
};

function DesktopCard({ member }) {
    const [isHover, setIsHover] = useState(false);
    const id = useId();
    return (
        <>
            <motion.div
                variants={memberVariants}
                className="relative cannot-hover:hidden"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <motion.div layoutId={id} className="m-3 h-24 w-24 overflow-hidden rounded-full sm:m-2 sm:h-20 sm:w-20">
                    <img
                        src={member.image || '/images/avatar_placeholder.png'}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
                {/* tooltip */}
                {isHover && (
                    <motion.div
                        className="absolute top-0 left-1/2 z-member-card flex w-[260px] -translate-x-1/2 flex-col items-center rounded-xl bg-bg-light py-6 px-3 shadow-lg shadow-gray-500/20 dark:shadow-gray-600/20 cannot-hover:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            layoutId={id}
                            className="m-3 h-28 w-28 overflow-hidden rounded-full sm:m-2 sm:h-24 sm:w-24"
                        >
                            <img
                                src={member.image || '/images/avatar_placeholder.png'}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                        <p className="gradient-text mt-4 text-lg font-bold">{member.name}</p>

                        {
                            member.role_titles.map((title, index) => (
                                <p key={index} className="mt-2">{title}</p>
                            ))
                        }
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}

function MobileCard({ member }) {
    const [isSelected, setIsSelected] = useState(false);
    const id = useId();
    return (
        <>
            <motion.div variants={memberVariants} className="relative can-hover:hidden">
                <motion.div
                    layoutId={id}
                    className="m-3 h-24 w-24 overflow-hidden rounded-full sm:m-2 sm:h-20 sm:w-20"
                    onClick={() => setIsSelected(true)}
                >
                    <img
                        src={member.image || '/images/avatar_placeholder.png'}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
                {/* dialog */}
                {isSelected && (
                    <motion.div
                        className="fixed inset-0 z-dialog flex items-center justify-center bg-black/50 can-hover:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsSelected(false)}
                    >
                        <motion.div
                            className="flex w-[260px] flex-col items-center rounded-xl bg-bg-light py-6 px-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div layoutId={id} className="m-3 h-28 w-28 overflow-hidden rounded-full">
                                <img
                                    src={member.image || '/images/avatar_placeholder.png'}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                            <p className="gradient-text mt-4 text-lg font-bold">{member.name}</p>
                            {
                                member.role_titles.map((title, index) => (
                                    <p key={index} className="mt-2">{title}</p>
                                ))
                            }
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}

function MemberCard({ member }) {
    return (
        <>
            <DesktopCard member={member} />
            <MobileCard member={member} />
        </>
    );
}

export default MemberCard;
