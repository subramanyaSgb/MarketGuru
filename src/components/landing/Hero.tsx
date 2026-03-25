"use client";
import SearchBar from "@/components/ui/SearchBar";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden hero-gradient">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-400 rounded-full animate-float opacity-40" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <ShinyText
            text="AI-Powered Trading Intelligence"
            speed={3}
            className="text-sm font-semibold"
            color="#3b82f6"
            shineColor="#93c5fd"
          />
        </div>

        {/* Headline */}
        <BlurText
          text="Your AI Trading Expert for the Indian Stock Market"
          delay={80}
          animateBy="words"
          direction="bottom"
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 justify-center"
        />

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-500 mb-14 max-w-2xl mx-auto animate-fade-in-up stagger-3 opacity-0 leading-relaxed" style={{ fontFamily: 'DM Sans' }}>
          Get real-time buy &amp; sell signals powered by AI with{" "}
          <span className="text-gray-900 font-semibold">100 years of trading wisdom</span>
        </p>

        {/* Search */}
        <div className="animate-fade-in-up stagger-4 opacity-0">
          <SearchBar size="lg" />
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400 animate-fade-in-up stagger-5 opacity-0">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Real-time NSE/BSE
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Free to use
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No signup required
          </span>
        </div>
      </div>
    </section>
  );
}
