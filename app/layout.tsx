import type { Metadata } from 'next';
import './globals.css';
import SmoothScroller from './components/SmoothScroller';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: '패스트파이브 | 프리미엄 공유오피스 그 이상의 가치',
  description: '단순한 사무실이 아닙니다. 성공을 위한 완벽한 비즈니스 플랫폼, 패스트파이브. 지금 투어 신청하고 30,000원 상당의 웰컴 키트를 받아보세요.',
  keywords: ['공유오피스', '패스트파이브', '강남사무실', '스타트업', '워크스페이스'],
  openGraph: {
    title: '패스트파이브 (FASTFIVE)',
    description: '프리미엄 공유오피스 투어 신청 시 3만원 혜택 증정',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '패스트파이브 (FASTFIVE)',
    description: '성공하는 비즈니스를 위한 최고의 선택',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-white/20 font-sans">
        <div className="noise-overlay" />
        <SmoothScroller>
          <Navbar />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
