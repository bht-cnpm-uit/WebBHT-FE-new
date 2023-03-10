'use client';
import { motion } from 'framer-motion';
import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';

export default function HeroClient({ heroHeadingAndDescription, buttonInHero }) {
    return (
        <motion.div
            className="w-1/2 space-y-6 md:w-full"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', duration: 1, delay: 0.2 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
        >
            <div>
                {/* HEADING */}
                <h2
                    className="text-5xl font-bold leading-tight text-text-dark xs:text-3xl"
                    dangerouslySetInnerHTML={{ __html: heroHeadingAndDescription?.heading }}
                ></h2>

                {/* Platform */}
                {/* <div className="mt-3">
                    <PlatformGroup />
                </div> */}
            </div>
            {/* DESCIPTION */}
            <div className="text-lg xs:text-base">
                <ParseNotionPageContent>{heroHeadingAndDescription.description || []}</ParseNotionPageContent>
            </div>

            {buttonInHero}
        </motion.div>
    );
}
