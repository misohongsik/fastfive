'use client';

import { useActionState, useState } from 'react';
import { submitTourRequest } from './actions';
import { ArrowLeft, CheckCircle, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import GlassCard from '../components/GlassCard';

const initialState = {
    message: '',
    errors: undefined,
    success: false,
};

// Modal Component
function TermModal({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: React.ReactNode }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[#1A1A1A] w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                    {content}
                </div>
                <div className="p-6 border-t border-white/10 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TourPage() {
    const [state, formAction, isPending] = useActionState(submitTourRequest, initialState);

    // Consent State
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [marketingChecked, setMarketingChecked] = useState(false);

    // Modal State
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);

    const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setPrivacyChecked(checked);
        setMarketingChecked(checked);
    };

    // Content for Modals based on user images
    const privacyContent = `
패스트파이브(주)에서는 개인정보 보호를 위하여 개인정보 보호지침을 마련하고 이를 준수하고 있습니다.

1. 개인 정보의 수집 · 이용 목적
   • 입주 상담

2. 수집하는 개인정보의 항목
   • 회사명(없을 시 성명), 휴대전화번호, 이메일

3. 개인정보의 보유 · 이용 기간
   • 수집일로부터 5년

• 위의 개인정보 수집 동의를 거부할 수 있으며, 거부 시 입주상담을 받을 수 없습니다.
• 더 자세한 내용은 개인정보 처리방침을 확인해 주세요.
  `;

    const marketingContent = `
패스트파이브(주)에서는 개인정보 보호를 위하여 개인정보 보호지침을 마련하고 이를 준수하고 있습니다.

1. 개인 정보의 수집 · 이용 목적
   • 패스트파이브 내 다양한 상품 및 서비스, 지점, 혜택 안내를 위한 광고성 정보 발송

2. 수집하는 개인정보의 항목
   • 회사명(없을 시 성명), 휴대전화번호, 이메일

3. 개인정보의 보유 · 이용 기간
   • 수집일로부터 5년

• 위의 마케팅 활용 동의를 거부할 수 있으며 거부 시, 무료 체험 신청 및 지점, 혜택 안내를 받을 수 없습니다.
• 당사는 개인정보보호법 및 정보통신망법을 준수하고 있으며, 해당 동의 내용을 기반으로 개인정보 수집 및 정보 수신 동의로 간주합니다.
  `;

    return (
        <main className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4">
            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-2xl my-10">
                <Link href="/" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <GlassCard className="w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Book a Tour</h1>
                        <p className="text-white/60">
                            투어를 신청하시면 담당자가 1시간 이내에 연락드립니다.<br />
                            <span className="text-red-400 font-medium">방문 완료 시 웰컴 키트(3만원 상당) 증정</span>
                        </p>
                    </div>

                    {state.success ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">신청이 완료되었습니다!</h2>
                            <p className="text-white/60 mb-8">
                                입력하신 연락처로 안내 문자가 발송될 예정입니다.
                            </p>
                            <Link href="/" className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                                홈으로 돌아가기
                            </Link>
                        </div>
                    ) : (
                        <form action={formAction} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm text-white/70 pl-1">이름</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        placeholder="홍길동"
                                        required
                                    />
                                    {state.errors?.name && <p className="text-red-400 text-xs pl-1">{state.errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm text-white/70 pl-1">연락처</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        placeholder="010-1234-5678"
                                        required
                                    />
                                    {state.errors?.phone && <p className="text-red-400 text-xs pl-1">{state.errors.phone}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="companyName" className="text-sm text-white/70 pl-1">회사명</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        placeholder="패스트파이브"
                                        required
                                    />
                                    {state.errors?.companyName && <p className="text-red-400 text-xs pl-1">{state.errors.companyName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm text-white/70 pl-1">이메일</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                        placeholder="example@email.com"
                                        required
                                    />
                                    {state.errors?.email && <p className="text-red-400 text-xs pl-1">{state.errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="personCount" className="text-sm text-white/70 pl-1">입주 인원</label>
                                    <select
                                        id="personCount"
                                        name="personCount"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors [&>option]:bg-black text-white appearance-none"
                                        required
                                    >
                                        <option value="">선택해주세요</option>
                                        <option value="2-4">2 ~ 4인</option>
                                        <option value="5-10">5 ~ 10인</option>
                                        <option value="11-20">11 ~ 20인</option>
                                        <option value="21-50">21 ~ 50인</option>
                                        <option value="50+">50인 이상</option>
                                    </select>
                                    {state.errors?.personCount && <p className="text-red-400 text-xs pl-1">{state.errors.personCount}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="locationPreference" className="text-sm text-white/70 pl-1">희망 지역</label>
                                    <select
                                        id="locationPreference"
                                        name="locationPreference"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors [&>option]:bg-black text-white appearance-none"
                                        required
                                    >
                                        <option value="">선택해주세요</option>
                                        <option value="Gangnam">강남/역삼/선릉</option>
                                        <option value="Seocho">서초/교대</option>
                                        <option value="Yeouido">여의도</option>
                                        <option value="Euljiro">을지로/시청</option>
                                        <option value="Seongsu">성수</option>
                                        <option value="Other">기타</option>
                                    </select>
                                    {state.errors?.locationPreference && <p className="text-red-400 text-xs pl-1">{state.errors.locationPreference}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="tourDate" className="text-sm text-white/70 pl-1">방문 희망일</label>
                                <input
                                    type="date"
                                    id="tourDate"
                                    name="tourDate"
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/30 transition-colors text-white scheme-dark"
                                    required
                                />
                                {state.errors?.tourDate && <p className="text-red-400 text-xs pl-1">{state.errors.tourDate}</p>}
                            </div>

                            {/* Privacy & Marketing Consent */}
                            <div className="pt-2 pb-2 space-y-4 border-t border-white/10 mt-6">
                                {/* All Check */}
                                <label className="flex items-center gap-3 pb-2 pt-4 cursor-pointer">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            id="allCheck"
                                            checked={privacyChecked && marketingChecked}
                                            onChange={handleAllCheck}
                                            className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-white/30 transition-all checked:border-[#FF4D4D] checked:bg-[#FF4D4D]"
                                        />
                                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg select-none">약관에 모두 동의합니다.</span>
                                </label>

                                {/* Privacy Check */}
                                <div className="flex items-center gap-3 pl-1">
                                    <label htmlFor="privacyCheck" className="relative flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id="privacyCheck"
                                            name="privacyConsent"
                                            checked={privacyChecked}
                                            onChange={(e) => setPrivacyChecked(e.target.checked)}
                                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 transition-all checked:border-[#FF4D4D] checked:bg-[#FF4D4D]"
                                        />
                                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </label>
                                    <div className="text-sm text-white/70 select-none">
                                        상담을 위한 <span className="underline cursor-pointer hover:text-white" onClick={(e) => { e.preventDefault(); setIsPrivacyModalOpen(true); }}>개인정보 수집과 이용 동의</span> (필수)
                                    </div>
                                </div>
                                {state.errors?.privacyConsent && <p className="text-red-400 text-xs pl-8">{state.errors.privacyConsent}</p>}


                                {/* Marketing Check */}
                                <div className="flex items-center gap-3 pl-1">
                                    <label htmlFor="marketingCheck" className="relative flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id="marketingCheck"
                                            name="marketingConsent"
                                            checked={marketingChecked}
                                            onChange={(e) => setMarketingChecked(e.target.checked)}
                                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 transition-all checked:border-[#FF4D4D] checked:bg-[#FF4D4D]"
                                        />
                                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </label>
                                    <div className="text-sm text-white/70 select-none">
                                        혜택 안내를 위한 <span className="underline cursor-pointer hover:text-white" onClick={(e) => { e.preventDefault(); setIsMarketingModalOpen(true); }}>마케팅 활용 동의</span> (선택)
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="bg-[#FF4D4D]/10 text-[#FF4D4D] text-xs px-4 py-3 rounded-lg mb-4 text-center font-medium">
                                    상담과 투어는 모두 무료이며, 원하실 경우 언제든 취소가 가능합니다 😉
                                </div>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            처리중...
                                        </>
                                    ) : (
                                        '무료 상담 받기'
                                    )}
                                </button>

                                {state.message && !state.success && (
                                    <p className="text-center text-red-400 text-sm mt-4">
                                        {state.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    )}

                    {/* Modals */}
                    <TermModal
                        isOpen={isPrivacyModalOpen}
                        onClose={() => setIsPrivacyModalOpen(false)}
                        title="개인정보 수집, 이용 동의서"
                        content={privacyContent}
                    />
                    <TermModal
                        isOpen={isMarketingModalOpen}
                        onClose={() => setIsMarketingModalOpen(false)}
                        title="마케팅 활용 동의서 (필수)"
                        content={marketingContent}
                    />

                </GlassCard>
            </div>
        </main>
    );
}
