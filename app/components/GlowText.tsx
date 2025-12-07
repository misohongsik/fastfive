'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlowTextProps {
    text: string;
    glowColor?: string;
    className?: string;
    size?: string;
}

export default function GlowText({
    text,
    glowColor = '#00a8ff',
    className = "",
    size = "6rem"
}: GlowTextProps) {
    const textRef = useRef<HTMLHeadingElement>(null);
    const glowRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const glowText = glowRef.current;
        if (!glowText) return;

        // Animate the glow pulsing
        gsap.to(glowText, {
            textShadow: `
                0 0 20px ${glowColor},
                0 0 40px ${glowColor},
                0 0 80px ${glowColor},
                0 0 120px ${glowColor}
            `,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, [glowColor]);

    return (
        <div className={`relative isolate flex justify-center items-center ${className}`}>
            {/* Back Glow Layer (Volumetric feel) */}
            <h1
                ref={glowRef}
                className="absolute inset-0 z-0 blur-xl opacity-80 select-none overflow-visible whitespace-nowrap"
                style={{
                    color: glowColor,
                    fontSize: size,
                    textShadow: `0 0 30px ${glowColor}`
                }}
                aria-hidden="true"
            >
                {text}
            </h1>

            {/* Front Crisp Text */}
            <h1
                ref={textRef}
                className="relative z-10 text-white font-black tracking-tighter mix-blend-overlay overflow-visible whitespace-nowrap"
                style={{ fontSize: size }}
            >
                {text}
            </h1>
        </div>
    );
}
