'use client';
import { motion } from 'framer-motion';

export default function FooterClient({ footerDescription, footerShortLink, footerContact }) {
    return (
        <motion.footer
            className="bg-bg-light py-10 px-p-body"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1 }}
        >
            <div className="mx-auto flex max-w-container flex-wrap md:flex-col xs:max-w-none">
                {footerDescription}
                <div className="flex flex-1 justify-evenly md:flex-wrap md:justify-start xs:justify-center">
                    {footerShortLink}
                    {footerContact}
                </div>
            </div>
        </motion.footer>
    );
}
