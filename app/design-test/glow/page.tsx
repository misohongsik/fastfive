'use client';

import GlowText from '../../components/GlowText';

export default function GlowTestPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center space-y-32 overflow-hidden">

            <section className="text-center relative">
                <p className="text-gray-500 mb-8 uppercase tracking-[0.5em] text-xs">Volumetric Light Demo</p>
                <GlowText
                    text="GLOW"
                    glowColor="#00ccff"
                    size="10rem"
                />
            </section>

            <section className="text-center relative">
                <GlowText
                    text="FASTFIVE"
                    glowColor="#ff0055"
                    size="6rem"
                />
            </section>

            <section className="text-center relative">
                <GlowText
                    text="AMAZING"
                    glowColor="#ffd700"
                    size="5rem"
                />
            </section>

        </main>
    );
}
