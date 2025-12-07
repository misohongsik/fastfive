'use client';

import MouseTextEffect from '../../components/MouseTextEffect';

export default function MouseTextTestPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-10 space-y-32">

            <section className="text-center space-y-6">
                <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">Hover Effect Demo</p>
                <div className="text-6xl md:text-9xl font-black tracking-tighter">
                    <MouseTextEffect
                        text="POSSIBILITIES"
                        spotlightSize={200}
                        className="text-gray-800"
                    />
                </div>
            </section>

            <section className="text-center space-y-6">
                <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">Small Spotlight</p>
                <div className="text-4xl md:text-7xl font-bold">
                    <MouseTextEffect
                        text="DISCOVER MORE"
                        spotlightSize={100}
                        className="text-gray-900"
                    />
                </div>
            </section>

        </main>
    );
}
