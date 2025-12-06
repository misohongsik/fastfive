'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Stagger Animation (Chaos to Order)
            const textElements = textRef.current?.children;
            if (textElements) {
                gsap.from(textElements, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    delay: 0.5, // Wait for hydration
                });
            }

            // Visual Parallax/Float Animation
            if (visualRef.current) {
                gsap.to(visualRef.current.children, {
                    y: '20px',
                    duration: 2,
                    stagger: {
                        each: 0.5,
                        yoyo: true,
                        repeat: -1,
                    },
                    ease: 'sine.inOut',
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 pt-20"
        >
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left: Typography (Asymmetrical spacing) */}
                <div ref={textRef} className="lg:col-span-7 flex flex-col gap-6 z-10">
                    <span className="inline-block text-white/60 font-medium tracking-widest text-sm uppercase mb-4">
                        Premium Shared Office
                    </span>

                    <h1 className="text-fluid-h1 font-bold leading-[0.9] -ml-1">
                        <span className="block text-white">Work where</span>
                        <span className="block text-white/50 italic font-light">Success</span>
                        <span className="block text-white">Finds You.</span>
                    </h1>

                    <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl mix-blend-overlay animate-pulse" />

                    {/* Glass Card Floating 1 */}
                    <div className="absolute top-1/4 right-0 w-80 h-96 glass-panel rounded-3xl transform rotate-[-6deg] p-8 flex flex-col justify-between border-white/20">
                        <div className="w-12 h-12 rounded-full bg-white/10 mb-4" />
                        <div className="space-y-4">
                            <div className="h-4 w-3/4 bg-white/10 rounded" />
                            <div className="h-4 w-1/2 bg-white/10 rounded" />
                        </div>
                    </div>

                    {/* Glass Card Floating 2 (Beneath) */}
                    <div className="absolute bottom-10 left-10 w-64 h-48 glass-panel rounded-2xl transform rotate-[12deg] z-[-1] opacity-70 border-white/10">
                    </div>
                </div>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
}
