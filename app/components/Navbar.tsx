'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import GlowText from './GlowText';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent
                ${scrolled
                    ? 'bg-black/40 backdrop-blur-xl py-3 border-white/10'
                    : 'bg-transparent py-6'
                }
            `}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <GlowText text="FASTFIVE" size="1.5rem" glowColor="#ffffff" />
                </Link>

                {/* Glow Button */}
                <Link
                    href="/tour"
                    className="relative group px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm transition-transform duration-300 hover:scale-105 active:scale-95"
                    style={{
                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Book a Tour
                    </span>

                    {/* Hover Glow Animation */}
                    <div className="absolute inset-0 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                </Link>
            </div>
        </nav>
    );
}
