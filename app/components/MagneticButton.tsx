'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;
        if (!button || !text) return;

        const xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        // Text moves slightly faster/further for parallax feel
        const xToText = gsap.quickTo(text, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const yToText = gsap.quickTo(text, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.3); // Button follows 30% of cursor distance
            yTo(y * 0.3);
            xToText(x * 0.1); // Text follows 10%
            yToText(y * 0.1);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            xToText(0);
            yToText(0);
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden transition-colors hover:bg-gray-100 ${className}`}
        >
            <span ref={textRef} className="relative z-10 block pointer-events-none">
                {children}
            </span>
        </button>
    );
}
