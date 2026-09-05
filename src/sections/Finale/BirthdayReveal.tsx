import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cake } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';
import { birthdayData } from '../../data/timelineData';
import { SparkleIcon, StarIcon } from '../../components/ui/DecorativeShapes';

interface BirthdayRevealProps {
  onRevealBirthday: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({
  onRevealBirthday,
}) => {
  useEffect(() => {
    soundEngine.setStageMood('birthday-reveal');
  }, []);

  const handleContinue = () => {
    soundEngine.playChime(659.25);
    onRevealBirthday();
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden z-10">
      <div className="max-w-xl z-10 space-y-8">
        {/* Step 1: "You've walked through our story..." */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-[#F48FB1] shadow-sm">
            <SparkleIcon className="w-4 h-4 text-[#D81B60]" />
            <span className="text-xs uppercase font-sans tracking-widest text-[#D81B60] font-bold">
              The Moment Has Come
            </span>
            <StarIcon className="w-4 h-4 text-[#D81B60]" />
          </div>

          <h2
            dir="auto"
            className="font-display text-2xl sm:text-4xl text-[#381E30] font-normal italic leading-relaxed"
          >
            {birthdayData.finale.transitionText1}
          </h2>
        </motion.div>

        {/* Step 2: "And now, there's one more thing..." */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2"
        >
          <h3
            dir="auto"
            className="font-display text-3xl sm:text-5xl md:text-6xl text-[#D81B60] font-bold tracking-wide leading-tight"
          >
            {birthdayData.finale.transitionText2}
          </h3>
        </motion.div>

        {/* Step 3: Action to unveil celebration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-4"
        >
          <button
            onClick={handleContinue}
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#D81B60] hover:bg-[#B80058] text-white font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(216,27,96,0.35)] hover:scale-105 active:scale-95 focus:outline-none"
          >
            <Cake className="w-4 h-4 text-white" />
            <span>Step Forward to Your Cake</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex items-center gap-2 text-xs text-[#5C354E] font-semibold tracking-widest uppercase font-sans">
        <SparkleIcon className="w-4 h-4 text-[#D81B60]" />
        <span>Celebration awaits</span>
        <StarIcon className="w-4 h-4 text-[#D81B60]" />
      </div>
    </div>
  );
};
