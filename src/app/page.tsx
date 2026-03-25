import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";
import DisclaimerModal from "@/components/ui/DisclaimerModal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <DisclaimerModal />
      <Navbar />
      <Hero />
      <HowItWorks />
      <TrustSection />
      <Footer />
    </main>
  );
}
