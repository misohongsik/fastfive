'use client';

import { useState } from 'react';
import LiquidBackground from '../../components/LiquidBackground';
import { LIQUID_PRESETS, LiquidPresetName } from '../../components/LiquidPresets';

export default function LiquidTestPage() {
    const [currentPreset, setCurrentPreset] = useState<LiquidPresetName>('Ocean');

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background */}
            <LiquidBackground options={LIQUID_PRESETS[currentPreset]} />

            {/* Content Overlay */}
            <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-center">
                <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter">
                    Liquid {currentPreset}
                </h1>

                <div className="grid grid-cols-2 gap-4">
                    {(Object.keys(LIQUID_PRESETS) as LiquidPresetName[]).map((preset) => (
                        <button
                            key={preset}
                            onClick={() => setCurrentPreset(preset)}
                            className={`
                                px-6 py-3 rounded-xl font-medium transition-all duration-300
                                ${currentPreset === preset
                                    ? 'bg-white text-black scale-105 shadow-lg'
                                    : 'bg-black/30 text-white hover:bg-white/20'}
                            `}
                        >
                            {preset} Mode
                        </button>
                    ))}
                </div>

                <p className="mt-8 text-white/50 text-sm">
                    Three.js GLSL Shader Implementation
                </p>
            </div>
        </main>
    );
}
