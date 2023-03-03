'use client';

import ParseNotionPageContent from '~/app/components/ParseNotionPageContent';

export default function BannerSectionClient({ heading, description }) {
    return (
        <div className="flex flex-col items-center justify-center px-p-body pb-16 pt-12">
            <h2
                className="mb-7 max-w-[620px] text-center text-5xl font-bold leading-tight text-text-dark xs:text-4xl"
                dangerouslySetInnerHTML={{ __html: heading }}
            />
            <div className="max-w-[777px] text-center text-lg xs:text-base">
                <ParseNotionPageContent>{description || []}</ParseNotionPageContent>
            </div>
        </div>
    );
}
