import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface TransitionInterludeProps {
  onContinue: () => void;
}

export const TransitionInterlude: React.FC<TransitionInterludeProps> = ({ onContinue }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2200);
    const timer2 = setTimeout(() => setStep(3), 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContinue = () => {
    soundEngine.playChime(659.25);
    onContinue();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#060408] text-center overflow-hidden">
      {/* Deep minimal focal light */}
      <div className="absolute w-96 h-96 rounded-full bg-radial from-champagne/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-xl z-10 space-y-8">
        {/* Step 1: "You've reached the end..." */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-display text-3xl sm:text-5xl text-storyText-secondary/80 font-light italic">
            You’ve reached the end of the chapters...
          </h2>
        </motion.div>

        {/* Step 2: "Or maybe..." */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="pt-2"
          >
            <h3 className="font-display text-4xl sm:text-6xl text-champagne font-normal tracking-wide">
              Or maybe...
            </h3>
          </motion.div>
        )}

        {/* Step 3: Continue Action */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-6"
          >
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-champagne via-roseAccent to-champagne text-background font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-champagne-glow hover:scale-105 active:scale-95"
              data-cursor="open"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 text-background" />
            </button>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-10 flex items-center gap-2 text-[11px] text-storyText-muted tracking-widest uppercase">
        <Sparkles className="w-3.5 h-3.5 text-champagne animate-pulse" />
        <span>One more surprise awaits</span>
      </div>
    </div>
  );
};
