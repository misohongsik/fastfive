'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    stagger?: number;
}

export default function TypingText({
    text,
    className = "",
    speed = 0.05,
    delay = 0,
    stagger = 0.03
}: TypingTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = charsRef.current;

        // Reset
        gsap.set(chars, { autoAlpha: 0, y: 10 });

        // Animation
        gsap.to(chars, {
            duration: 0.5,
            autoAlpha: 1,
            y: 0,
            stagger: stagger,
            ease: "back.out(1.7)",
            delay: delay,
        });

    }, [text, delay, stagger]);

    // Split text into characters for individual animation
    const characters = text.split('');

    return (
        <div ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
            {characters.map((char, index) => (
                <span
                    key={index}
                    ref={(el) => {
                        charsRef.current[index] = el;
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
