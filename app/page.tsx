import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import TrustSection from './components/TrustSection';

export default function Home() {
  return (
    <main className="relative z-10 w-full overflow-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TrustSection />
    </main>
  );
}
