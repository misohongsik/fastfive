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
        stat: "₩ 100M+",
        colSpan: "col-span-1",
    },
    {
        id: 2,
        title: "끝없는 인테리어",
        desc: "설계부터 시공, 가구 구매까지.\n입주 준비에만 최소 2개월이 소요됩니다.",
        stat: "2 Months+",
        colSpan: "col-span-1",
    },
    {
        id: 3,
        title: "관리 리소스 낭비",
        desc: "청소, 보안, 네트워크 설정...\n대표님이 직접 신경 쓰기엔 시간이 너무 아깝습니다.",
        stat: "High Stress",
        colSpan: "col-span-1",
    },
    {
        id: 4,
        title: "경직된 계약 기간",
        desc: "최소 2년 계약의 족쇄.\n인원이 늘거나 줄어도 이사하기 쉽지 않습니다.",
        stat: "2 Years Fix",
        colSpan: "col-span-1",
    },
];

export default function ProblemSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Safety check: ensure refs exist
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

        const ctx = gsap.context(() => {
            // Header Fade In
            gsap.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Cards Stagger Effect
            // explicit array conversion for safety
            const cards = gsap.utils.toArray(gridRef.current!.children);
            if (cards.length > 0) {
                gsap.from(cards, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#050505] text-white py-24 md:py-32 px-6 md:px-20 overflow-hidden">

            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header Section */}
            <div ref={headerRef} className="max-w-7xl mx-auto mb-16 md:mb-24 relative z-10">
                <span className="text-red-500 font-bold tracking-widest uppercase block mb-4">
                    The Reality
                </span>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    사무실 구하기,<br className="md:hidden" />
                    왜 이렇게 <span className="text-white/50">힘들까요?</span>
                </h2>
            </div>

            {/* Bento Grid layout */}
            <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {problems.map((item) => (
                    <div
                        key={item.id}
                        className={`group relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between h-[300px] md:h-[350px] hover:bg-white/10 transition-colors duration-300 overflow-hidden ${item.colSpan}`}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="text-5xl font-bold text-white/10 mb-6 group-hover:text-red-500/20 transition-colors">
                                0{item.id}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3">
                                {item.title}
                            </h3>
                            <p className="text-lg text-white/60 leading-relaxed whitespace-pre-wrap">
                                {item.desc}
                            </p>
                        </div>

                        <div className="relative z-10 border-t border-white/10 pt-6 mt-auto">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/40 uppercase tracking-widest">Pain Cost</span>
                                <span className="text-2xl md:text-3xl text-red-400 font-mono">
                                    {item.stat}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
