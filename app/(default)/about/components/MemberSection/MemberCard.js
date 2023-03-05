'use client';

function MemberCard({ member }) {
    return (
        <>
            <div className="group">
                <div className="m-3 h-24 w-24 overflow-hidden rounded-full ring-primary ring-offset-2 sm:m-2 sm:h-20 sm:w-20 can-hover:group-hover:ring-2">
                    <img
                        src={member.image || '/images/avatar_placeholder.png'}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}

export default MemberCard;
