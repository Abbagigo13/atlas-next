import AgentTeam from '@/components/AgentTeam';
import CTASection from '@/components/CTASection';
import DebatePreview from '@/components/DebatePreview';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import ParticleField from '@/components/ParticleField';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';

export default function Home() {
  return (
    <>
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AgentTeam />
        <HowItWorks />
        <DebatePreview />
        <TechStack />
        <Stats />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
