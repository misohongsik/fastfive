'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
    {
        id: 1,
        title: "보증금의 압박",
        desc: "강남권 사무실 평균 보증금 1억 원.\n초기 자금이 묶여 비즈니스 확장이 늦어지시나요?",
        stat: "₩ 100,000,000+",
    },
    {
        id: 2,
        title: "끝없는 인테리어",
        desc: "설계부터 시공, 가구 구매까지.\n입주 준비에만 최소 2개월이 소요됩니다.",
        stat: "2 Months+",
    },
    {
        id: 3,
        title: "관리 리소스 낭비",
        desc: "청소, 보안, 네트워크 설정...\n대표님이 직접 신경 쓰기엔 시간이 너무 아깝습니다.",
        stat: "High Stress",
    },
    {
        id: 4,
        title: "경직된 계약 기간",
        desc: "최소 2년 계약의 족쇄.\n인원이 늘거나 줄어도 이사하기 쉽지 않습니다.",
        stat: "2 Years Fix",
    },
];

export default function ProblemSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = horizontalRef.current?.children;
            if (!cards || !sectionRef.current || !triggerRef.current) return;

            // Calculate total width to scroll
            // We want to scroll until the last card is fully visible
            // (Number of cards - 1) * 100% is a simple approximation/starting point
            const totalWidth = cards.length * 100;

            gsap.to(horizontalRef.current, {
                xPercent: -100 * (problems.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "+=3000", // Scroll distance
                    onUpdate: (self) => {
                        // Velocity-based Skew (The "Organic" Rule 3.2)
                        const skew = self.getVelocity() / 300;
                        gsap.to(cards, {
                            skewX: skew,
                            duration: 0.1,
                            overwrite: 'auto',
                            ease: "power3",
                        });
                    },
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#050505] text-white">
            <div ref={triggerRef} className="h-screen w-full flex items-center overflow-hidden">

                {/* Intro Text - Increased top spacing for mobile to clear navbar */}
                <div className="absolute left-6 md:left-20 top-48 md:top-20 z-10 max-w-sm pointer-events-none mix-blend-difference">
                    <span className="text-red-500 font-bold tracking-widest uppercase mb-2 block">
                        The Reality
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        사무실 구하기,<br />
                        왜 이렇게<br />
                        <span className="text-white/50">힘들까요?</span>
                    </h2>
                </div>

                {/* Horizontal Container */}
                <div ref={horizontalRef} className="flex gap-20 pl-[40vw] pr-[10vw]">
                    {problems.map((item) => (
                        <div
                            key={item.id}
                            className="w-[80vw] md:w-[600px] h-[60vh] bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-between backdrop-blur-sm shrink-0 hover:bg-white/10 transition-colors"
                        >
                            <div>
                                <div className="text-6xl md:text-8xl font-bold text-white/10 mb-6">
                                    0{item.id}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-xl text-white/60 whitespace-pre-wrap leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <span className="text-xs text-white/40 uppercase tracking-widest">Pain Cost</span>
                                <p className="text-3xl md:text-4xl text-red-400 font-mono mt-2">
                                    {item.stat}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
