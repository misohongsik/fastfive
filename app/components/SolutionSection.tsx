'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Monitor, Users, Zap } from 'lucide-react';
import MouseTextEffect from './MouseTextEffect';
import GlowText from './GlowText';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
    { icon: <Coffee />, label: "Unlimited Lounge", x: -200, y: -150 },
    { icon: <Monitor />, label: "Hi-Tech Meeting Rooms", x: 200, y: -150 },
    { icon: <Users />, label: "24/7 Networking", x: -200, y: 150 },
    { icon: <Zap />, label: "Zero Management", x: 200, y: 150 },
];

export default function SolutionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const orbitalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    pin: true,
                    scrub: 1,
                },
            });

            // Step 1: Core Scale Up
            tl.fromTo(coreRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.7)" }
            );

            // Step 2: Orbitals Float In
            const orbitals = orbitalRef.current?.children;
            const isMobile = window.innerWidth < 768; // Simple check
            const modifier = isMobile ? 0.4 : 1; // Reduce distance to 40% on mobile

            if (orbitals) {
                Array.from(orbitals).forEach((orbital, index) => {
                    const item = solutions[index];
                    tl.fromTo(orbital,
                        { x: 0, y: 0, opacity: 0, scale: 0.5 },
                        {
                            x: item.x * modifier, // Apply modifier
                            y: item.y * modifier, // Apply modifier
                            opacity: 1,
                            scale: 1,
                            duration: 1.5,
                            ease: "power3.out"
                        },
                        "<+=0.2"
                    );
                });
            }

            // Step 3: Drift Animation (Continuous)
            tl.to(orbitalRef.current, { rotation: 10, duration: 2 }, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent blur-3xl" />

            {/* Central Core */}
            <div ref={coreRef} className="relative z-20 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.3)] mb-8 overflow-hidden">
                    <GlowText text="FASTFIVE" size="1.1rem" glowColor="#000000" textColor="black" className="text-black" />
                </div>

                {/* Mouse Effect Title */}
                <MouseTextEffect
                    text="Everything Is Ready."
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                    spotlightSize={200}
                />

                <p className="mt-4 text-white/70 max-w-md">
                    노트북만 가져오세요.<br />
                    나머지는 패스트파이브가 준비했습니다.
                </p>
            </div>

            {/* Orbiting Elements */}
            <div ref={orbitalRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {solutions.map((item, i) => (
                    <div key={i} className="absolute p-4 glass-panel rounded-2xl flex items-center gap-4 min-w-[200px] backdrop-blur-xl border-white/20">
                        <div className="p-2 bg-white/10 rounded-full text-white">
                            {item.icon}
                        </div>
                        <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
