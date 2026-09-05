import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';
import { birthdayData } from '../../data/timelineData';
import { soundEngine } from '../../lib/soundEngine';
import { SparkleIcon, StarIcon, HeartIcon } from '../../components/ui/DecorativeShapes';

interface CakeAndCandleSectionProps {
  onProceedToLetter: () => void;
}

export const CakeAndCandleSection: React.FC<CakeAndCandleSectionProps> = ({
  onProceedToLetter,
}) => {
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Synchronize mood
  useEffect(() => {
    soundEngine.setStageMood('birthday');
  }, []);

  const triggerCelebratoryConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;
    // Luxurious pastel & golden confetti palette
    const colors = ['#D81B60', '#FF80AB', '#FFD54F', '#BA68C8', '#FFB74D', '#F48FB1'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors,
        shapes: ['circle'],
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors,
        shapes: ['circle'],
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleBlowCandle = () => {
    if (isCandleBlown) return;

    setIsCandleBlown(true);
    soundEngine.playCandleBlow();

    setTimeout(() => {
      soundEngine.playCelebrationFanfare();
      triggerCelebratoryConfetti();
      setShowCelebration(true);
    }, 450);
  };

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden z-10 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl text-center z-10 pt-4 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-[#F48FB1] shadow-sm">
          <SparkleIcon className="w-4 h-4 text-[#D81B60]" />
          <span className="text-xs uppercase font-sans tracking-widest text-[#D81B60] font-bold">
            The Celebration • {birthdayData.recipient.birthdayDate}
          </span>
          <StarIcon className="w-4 h-4 text-[#D81B60]" />
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#1A0D18] font-bold">
          Make a Wish
        </h2>
        <p
          dir="auto"
          className="text-sm sm:text-base text-[#381E30] font-sans max-w-md mx-auto leading-relaxed font-medium"
        >
          {birthdayData.finale.wishPromptText}
        </p>
      </motion.div>

      {/* Central Cute Pastel Birthday Cake Illustration */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 py-6">
        {/* Candle Flame & Wick */}
        <div
          className="relative flex flex-col items-center mb-1 cursor-pointer focus:outline-none"
          onClick={handleBlowCandle}
          title="Tap to blow out candle"
        >
          {!isCandleBlown ? (
            <motion.div
              className="candle-flame cursor-pointer hover:scale-125 transition-transform"
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                rotate: [0, 1.5, -1.5, 1, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          ) : (
            <div className="w-4 h-8 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#D81B60]/80 smoke-puff" />
            </div>
          )}
          <div className="candle-wick" />
        </div>

        {/* Candle Stick */}
        <div
          onClick={handleBlowCandle}
          className="relative w-4 sm:w-5 h-16 rounded-t-sm bg-gradient-to-b from-white via-[#FFD6E4] to-[#F48FB1] shadow-sm cursor-pointer border border-[#D81B60]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(216,27,96,0.35)_50%,transparent_75%)] bg-[size:8px_8px]" />
        </div>

        {/* Cake Tier 1 (Top Tier - Soft Pink Pastel) */}
        <div className="w-44 sm:w-56 h-16 rounded-t-2xl bg-gradient-to-b from-white via-[#FFEAF2] to-[#FFD6E4] border-t-2 border-[#D81B60] shadow-sm flex items-center justify-center relative overflow-hidden -mt-1">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FFD6E4] via-[#D81B60] to-[#FFD6E4] rounded-b-md" />
          <div className="flex gap-4">
            <HeartIcon className="w-4 h-4 text-[#D81B60]" color="#D81B60" />
            <SparkleIcon className="w-4 h-4 text-[#D81B60]" />
            <HeartIcon className="w-4 h-4 text-[#D81B60]" color="#D81B60" />
          </div>
        </div>

        {/* Cake Tier 2 (Bottom Tier - Cream / Lavender Pastel) */}
        <div className="w-64 sm:w-80 h-24 rounded-t-3xl bg-gradient-to-b from-white via-[#EDE7F6] to-[#D1C4E9] border-t-2 border-[#7E57C2] shadow-card flex flex-col items-center justify-center relative overflow-hidden -mt-1">
          <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-[#D81B60] via-[#7E57C2] to-[#D81B60] rounded-b-lg" />
          <p className="font-display italic text-2xl sm:text-3xl text-[#1A0D18] font-bold tracking-widest mt-2">
            {birthdayData.recipient.name}
          </p>
        </div>

        {/* Cake Stand Base */}
        <div className="w-72 sm:w-96 h-4 rounded-full bg-gradient-to-r from-[#FFD6E4] via-white to-[#FFD6E4] border-2 border-[#F48FB1] shadow-md" />
        <div className="w-24 sm:w-32 h-4 bg-gradient-to-b from-[#F48FB1]/40 to-transparent rounded-b-xl" />

        {/* Blow Action CTA Button */}
        {!isCandleBlown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <button
              onClick={handleBlowCandle}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#D81B60] hover:bg-[#B80058] text-white font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(216,27,96,0.35)] hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            >
              <span>Tap to blow the candle</span>
              <Sparkles className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Seamless In-Line Celebration (No Screen-Blocking Modal!) */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg mt-2 mb-6 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 text-center space-y-5 shadow-[0_15px_40px_rgba(216,27,96,0.18)] border-2 border-[#F48FB1]"
          >
            <div className="w-12 h-12 rounded-full bg-[#D81B60] mx-auto flex items-center justify-center shadow-[0_4px_16px_rgba(216,27,96,0.35)]">
              <HeartIcon className="w-6 h-6 text-white" color="#FFFFFF" />
            </div>

            <div className="space-y-2">
              <h3
                dir="auto"
                className="font-display text-3xl sm:text-4xl text-[#1A0D18] font-bold leading-tight"
              >
                {birthdayData.finale.wishCelebrationHeadline}
              </h3>
              <p
                dir="auto"
                className="font-sans text-[#381E30] text-sm sm:text-base leading-relaxed font-medium"
              >
                {birthdayData.finale.wishCelebrationSubline}
              </p>
            </div>

            <div className="pt-2 border-t border-[#F8BBD0]">
              <button
                onClick={onProceedToLetter}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#D81B60] hover:bg-[#B80058] text-white font-sans font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_8px_25px_rgba(216,27,96,0.35)] transition-all duration-300 hover:scale-[1.02] focus:outline-none"
              >
                <span>Read Your Birthday Letter</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer hint */}
      {!showCelebration && (
        <div
          dir="auto"
          className="z-10 text-xs text-[#5C354E] font-medium text-center pb-2 font-sans"
        >
          {isCandleBlown
            ? 'The wish has been made ✨'
            : 'Tap the candle flame or button when you have made your wish.'}
        </div>
      )}
    </div>
  );
};
