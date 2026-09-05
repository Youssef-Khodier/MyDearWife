import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { birthdayData } from '../../data/timelineData';
import { soundEngine } from '../../lib/soundEngine';
import { SparkleIcon, StarIcon } from '../../components/ui/DecorativeShapes';

interface IntroSectionProps {
  onStart: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStart }) => {
  const handleBegin = () => {
    soundEngine.resume();
    soundEngine.startMusicBoxMelody();
    soundEngine.playChime(659.25);
    onStart();
  };

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-2xl z-10 space-y-8"
      >
        {/* Recipient Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#F48FB1] shadow-[0_4px_20px_rgba(216,27,96,0.1)]"
        >
          <SparkleIcon className="w-4 h-4 text-[#D81B60]" />
          <span className="text-xs font-sans tracking-widest uppercase text-[#1A0D18] font-bold">
            For {birthdayData.recipient.name} • {birthdayData.recipient.nickname}
          </span>
          <StarIcon className="w-4 h-4 text-[#D81B60]" />
        </motion.div>

        {/* Headline */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#1A0D18] leading-[1.15] tracking-tight"
          >
            A Little Story <br />
            <span className="italic text-[#D81B60] font-normal font-serif">
              that started in 2019.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="font-sans text-[#381E30] text-sm sm:text-lg font-medium max-w-lg mx-auto leading-relaxed"
          >
           مع بعض لحد ما اخر لحظة في عمري
          </motion.p>
        </div>

        {/* Decorative Floating Polaroid Preview Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="relative py-2 flex items-center justify-center"
        >
          <div className="relative bg-white p-3 pb-8 rounded-2xl shadow-[0_12px_35px_rgba(216,27,96,0.15)] border border-[#F8BBD0] -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="w-48 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden bg-[#FFEAF2] relative flex items-center justify-center">
              {/* Soft blur backdrop */}
              <img
                src="/images/2026 (now)/image (1).jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 opacity-35"
              />
              {/* Crisp complete uncropped photo */}
              <img
                src="/images/2026 (now)/image (1).jpg"
                alt="Maryam Birthday Celebration"
                className="relative z-10 w-full h-full object-contain"
                loading="eager"
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 z-30 text-white text-[11px] font-sans font-medium text-center drop-shadow-sm">
                Happy Birthday, Maryam ✨
              </div>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#FF80AB]/70 backdrop-blur-sm rounded-sm -rotate-1 border-l-2 border-r-2 border-[#D81B60]/30 shadow-sm" />
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="pt-2 flex flex-col items-center gap-3"
        >
          <button
            onClick={handleBegin}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#D81B60] hover:bg-[#B80058] text-white font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_8px_28px_rgba(216,27,96,0.38)] hover:scale-105 active:scale-95 focus:outline-none"
          >
            <span>Open Our Storybook</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="inline-flex items-center gap-2 text-xs font-sans text-[#7E57C2] font-semibold tracking-wider pt-2">
            <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-[#D81B60]" />
            <span>Sound & music box melodies included ♪</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
