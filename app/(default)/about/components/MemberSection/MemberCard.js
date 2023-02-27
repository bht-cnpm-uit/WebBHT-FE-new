'use client';
import { useFloating, flip, autoUpdate, shift, offset } from '@floating-ui/react-dom';

function MemberCard({ member }) {
    const { x, y, reference, floating, strategy } = useFloating({
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [offset(8), flip({ padding: 12 }), shift({ padding: 12 })],
        whileElementsMounted: (reference, floating, update) => {
            // IMPORTANT: Make sure the cleanup function is returned!
            return autoUpdate(reference, floating, update, {
                animationFrame: true,
            });
        },
    });

    return (
        <>
            <div className="group">
                <div
                    ref={reference}
                    tabIndex={0}
                    className="m-3 h-24 w-24 overflow-hidden rounded-full ring-primary ring-offset-2 sm:m-2 sm:h-20 sm:w-20 can-hover:group-hover:ring-2"
                >
                    <img
                        src={member.image || '/images/avatar_placeholder.png'}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* FLOATING CARD */}
                <div
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                    }}
                    className="invisible top-full z-member-card flex min-w-[260px] flex-col items-center rounded-md border bg-bg px-3 py-6 opacity-0 shadow transition-opacity can-hover:group-hover:visible can-hover:group-hover:opacity-100"
                >
                    <div className="h-32 w-32 overflow-hidden rounded-full">
                        <img
                            src={member.image || '/images/avatar_placeholder.png'}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-primary">{member.name}</p>
                    <p className="mt-2">{member.role}</p>
                </div>

                {/* DIALOG PANEL */}
                <div className="invisible fixed inset-0 z-dialog flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 can-hover:hidden">
                    <div className=" flex min-w-[260px] flex-col items-center rounded-md bg-bg px-3 py-6" tabIndex={0}>
                        <div className="h-32 w-32 overflow-hidden rounded-full">
                            <img
                                src={member.image || '/images/avatar_placeholder.png'}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="mt-4 text-lg font-semibold text-primary">{member.name}</p>
                        <p className="mt-2">{member.desciption}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberCard;
