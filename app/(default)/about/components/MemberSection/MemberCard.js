'use client';
import { motion } from 'framer-motion';

const memberVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
        opacity: 1,
        x: 0,
    },
};

function MemberCard({ member }) {
    return (
        <>
            <motion.div variants={memberVariants} className="group">
                <div className="m-3 h-24 w-24 overflow-hidden rounded-full ring-primary ring-offset-2 sm:m-2 sm:h-20 sm:w-20 can-hover:group-hover:ring-2">
                    <img
                        src={member.image || '/images/avatar_placeholder.png'}
                        className="h-full w-full object-cover"
                    />
                </div>
            </motion.div>
        </>
    );
}

export default MemberCard;
