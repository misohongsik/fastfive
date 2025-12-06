'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const companies = [
    "Google", "Samsung", "Naver", "Kakao", "Toss",
    "Woowa Bros", "Coupang", "HyperConnect", "Dunamu", "Krafton"
];

export default function TrustSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Marquee Animation via CSS is smoother for infinite loops, 
        // but we can add scroll-velocity skew using GSAP if desired.
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-white text-black py-32 rounded-t-[3rem] -mt-10 overflow-hidden z-30">

            {/* Infinite Marquee */}
            <div className="mb-40 space-y-8">
                <p className="text-center text-sm font-medium tracking-widest text-black/40 uppercase mb-12">
                    Trusted by Industry Leaders
                </p>

                {/* Row 1 */}
                <div className="relative flex overflow-hidden whitespace-nowrap">
                    <div className="animate-marquee flex gap-16 items-center px-8">
                        {[...companies, ...companies, ...companies].map((name, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-bold text-black/10 select-none hover:text-black/30 transition-colors">
                                {name}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 flex gap-16 items-center px-8">
                        {[...companies, ...companies, ...companies].map((name, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-bold text-black/10 select-none hover:text-black/30 transition-colors">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Massive CTA Footer */}
            <div ref={footerRef} className="relative px-6 md:px-12 pb-20">
                <div className="border-t border-black/10 pt-20 flex flex-col items-center text-center">

                    <h2 className="text-fluid-h1 font-black leading-[0.85] tracking-tighter mb-10">
                        WORK<br />
                        DIFFERENTLY
                    </h2>

                    <p className="text-xl md:text-2xl text-black/60 max-w-2xl mb-16 font-light">
                        지금 무료 투어를 신청하고,<br />
                        <span className="font-bold text-black border-b-2 border-black">30,000원 상당의 웰컴 키트</span>를 받아보세요.
                    </p>

                    <Link href="/tour" className="group relative w-full md:w-auto min-w-[300px] overflow-hidden rounded-full bg-black text-white px-12 py-8 text-xl font-bold transition-all hover:scale-105 active:scale-95 inline-block">
                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover:-translate-y-[150%] transition-transform duration-500 ease-in-out">
                            Book a Tour Now <ArrowUpRight />
                        </span>
                        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-[#FF4D4D]">
                            Get Welcome Kit <ArrowUpRight />
                        </span>
                    </Link>

                    <div className="mt-20 flex flex-col md:flex-row gap-8 text-sm text-black/40 font-medium tracking-wide">
                        <span>© 2024 FASTFIVE. All rights reserved.</span>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
        </section>
    );
}
