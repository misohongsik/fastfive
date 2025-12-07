'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MouseTextEffectProps {
    text: string;
    className?: string;
    spotlightSize?: number;
}

export default function MouseTextEffect({
    text,
    className = "",
    spotlightSize = 150
}: MouseTextEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const highlight = highlightRef.current;
        if (!container || !highlight) return;

        // Initialize clip-path
        gsap.set(highlight, {
            clipPath: `circle(0px at 0px 0px)`
        });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(highlight, {
                clipPath: `circle(${spotlightSize}px at ${x}px ${y}px)`,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(highlight, {
                clipPath: `circle(0px at 50% 50%)`, // Collapse or center
                duration: 0.5,
                ease: "power2.out"
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [spotlightSize]);

    return (
        <div ref={containerRef} className={`relative inline-block cursor-default ${className}`}>
            {/* Base Layer (Dimmed) */}
            <h1 className="text-white/20 select-none">
                {text}
            </h1>

            {/* Highlight Layer (Bright) */}
            <div
                ref={highlightRef}
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 select-none pointer-events-none"
                aria-hidden="true"
            >
                <h1 className="text-white">
                    {text}
                </h1>
            </div>
        </div>
    );
}
