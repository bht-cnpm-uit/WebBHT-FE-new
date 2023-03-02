'use client';
import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

export default function FramerCounter({ from, to, duration, isOver }) {
    const nodeRef = useRef();
    const isInView = useInView(nodeRef);

    useEffect(() => {
        const node = nodeRef.current;

        if (isInView) {
            animate(from, to, {
                duration,
                onUpdate(value) {
                    node.textContent = Math.floor(value);
                },
            });
        }

        return () => {};
    }, [from, to, isInView]);

    return (
        <div className="inline-flex items-center">
            <div ref={nodeRef}>0</div>
            {isOver && <div className="">+</div>}
        </div>
    );
}
