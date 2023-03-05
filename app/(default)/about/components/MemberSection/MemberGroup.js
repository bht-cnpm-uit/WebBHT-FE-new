import MemberCard from './MemberCard';

export default function MemeberGroup({ members, year }) {
    return (
        <div className="mt-10 w-full">
            <div className="-ml-[15px] flex items-center">
                <div className="rounded-full text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="ml-7 text-4xl font-bold text-text-semidark">{year}</div>
            </div>
            <div className="flex items-stretch">
                {/* Line */}
                <div className="-my-2 w-0.5 rounded-full bg-gradient-to-b from-primary via-primary-to to-primary-to/0"></div>
                {/* CARDS */}
                <div className="ml-7 mt-5 flex flex-1 flex-wrap">
                    {members?.map((member, index) => (
                        <MemberCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}
