'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Link from 'next/link';
import LiquidBackground from './LiquidBackground'; // Import
import { LIQUID_PRESETS } from './LiquidPresets'; // Import as named export
import GlowText from './GlowText'; // Import
import TypingText from './TypingText'; // Import

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
            {/* 1. DeepDark Liquid Background */}
            <LiquidBackground options={LIQUID_PRESETS.DeepDark} />

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left: Typography */}
                <div ref={textRef} className="lg:col-span-8 flex flex-col gap-8">

                    {/* Subtitle with Typing Animation */}
                    <div className="overflow-hidden">
                        <TypingText
                            text="Premium Shared Office"
                            className="text-white/60 font-medium tracking-[0.3em] text-sm uppercase"
                            speed={0.03}
                        />
                    </div>

                    {/* Main Title with Glow Effect */}
                    <div className="-ml-4 -my-4">
                        <GlowText
                            text="FASTFIVE"
                            glowColor="#ffffff"
                            size="clamp(4rem, 10vw, 9rem)"
                            className="justify-start origin-left transform scale-100"
                        />
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-3 text-2xl md:text-3xl text-white/80 font-light leading-relaxed max-w-2xl">
                        <TypingText text="Work where" delay={1.5} speed={0.03} />
                        <TypingText text="Success" className="text-white font-bold italic" delay={2.0} speed={0.03} />
                        <TypingText text="Finds You." delay={2.5} speed={0.03} />
                    </div>

                    <div className="pt-8">
                        <Link
                            href="/tour"
                            className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95"
                            style={{
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <span className="relative z-10">Book a Tour</span>
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Right: Abstract Visuals (Kept but integrated) */}
                <div ref={visualRef} className="hidden lg:block lg:col-span-4 relative h-[600px]">
                    {/* Glass Card 1 */}
                    <div className="absolute top-10 right-0 w-72 h-80 glass-panel rounded-3xl transform rotate-[-6deg] p-8 border border-white/20 bg-white/5 backdrop-blur-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 mb-6" />
                        <div className="space-y-4 opacity-50">
                            <div className="h-3 w-3/4 bg-white rounded-full" />
                            <div className="h-3 w-1/2 bg-white rounded-full" />
                            <div className="h-3 w-full bg-white rounded-full" />
                        </div>
                    </div>

                    {/* Glass Card 2 */}
                    <div className="absolute top-1/2 left-0 w-64 h-72 glass-panel rounded-3xl transform rotate-[12deg] z-[-1] border border-white/10 bg-white/5 backdrop-blur-md">
                        <div className="absolute bottom-6 left-6 right-6 h-32 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
