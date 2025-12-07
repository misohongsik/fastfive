'use client';

import TypingText from '../components/TypingText';

export default function DesignTestPage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 space-y-20">

            <div className="text-center space-y-4">
                <h2 className="text-gray-500 text-sm tracking-widest uppercase mb-4">Typing Motion Test 01</h2>
                <TypingText
                    text="공유오피스 그 이상의 가치,"
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                    delay={0.2}
                />
            </div>

            <div className="text-center space-y-4">
                <h2 className="text-gray-500 text-sm tracking-widest uppercase mb-4">Typing Motion Test 02</h2>
                <TypingText
                    text="패스트파이브에서 경험하세요."
                    className="text-3xl md:text-5xl font-bold text-white relative"
                    stagger={0.08}
                    delay={1.5}
                />
            </div>

            <div className="max-w-2xl text-center space-y-4 border border-white/10 p-10 rounded-2xl bg-white/5 backdrop-blur-sm">
                <h2 className="text-gray-500 text-sm tracking-widest uppercase mb-4">Description Text</h2>
                <TypingText
                    text="업무에만 집중할 수 있는 완벽한 공간과 서비스. 우리는 당신의 성공을 돕는 파트너입니다."
                    className="text-lg text-gray-300 leading-relaxed"
                    speed={0.01}
                    stagger={0.01}
                    delay={3}
                />
            </div>

        </main>
    );
}
