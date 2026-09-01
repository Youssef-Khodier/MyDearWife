import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { soundEngine } from '../../lib/soundEngine';

interface CakeAndCandleSectionProps {
  onProceedToLetter: () => void;
}

export const CakeAndCandleSection: React.FC<CakeAndCandleSectionProps> = ({ onProceedToLetter }) => {
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Trigger grand celebration confetti
  const triggerConfetti = () => {
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#EFA6B8', '#F6C6D5', '#E8C98A', '#FFF8F3', '#B9A7D8'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: ['circle', 'square'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: ['circle', 'square'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleBlowCandle = () => {
    if (isCandleBlown) return;

    setIsCandleBlown(true);
    soundEngine.playCandleBlow();

    // Stop mic stream if active
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((t) => t.stop());
      audioStreamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsMicActive(false);

    // Pause before celebration burst
    setTimeout(() => {
      soundEngine.playCelebrationFanfare();
      triggerConfetti();
      setShowCelebrationModal(true);
    }, 750);
  };

  // Optional Microphone Blow Detection
  const handleToggleMic = async () => {
    if (isMicActive) {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((t) => t.stop());
        audioStreamRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      setIsMicActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setIsMicActive(true);

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        // Average low-to-mid frequencies where breath noise concentrates
        let sum = 0;
        for (let i = 0; i < 60; i++) {
          sum += dataArray[i];
        }
        const avg = sum / 60;

        if (avg > 48) {
          handleBlowCandle();
          return;
        }

        animFrameRef.current = requestAnimationFrame(checkBlow);
      };

      checkBlow();
    } catch {
      setIsMicActive(false);
      // Tap works seamlessly
    }
  };

  useEffect(() => {
    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden bg-[#09070D]">
      {/* Warm Golden Room Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full transition-all duration-1000 ${
          isCandleBlown ? 'bg-radial from-roseAccent/15 via-transparent to-transparent blur-3xl' : 'bg-radial from-champagne/25 via-roseAccent/10 to-transparent blur-3xl'
        }`} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl text-center z-10 pt-10 sm:pt-4 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-champagne font-semibold">
            Chapter 04 • Birthday Finale
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl text-storyText-primary font-normal">
          Make a Wish
        </h2>
        <p className="text-sm sm:text-base text-storyText-secondary font-sans max-w-md mx-auto leading-relaxed">
          {birthdayData.finale.wishPromptText}
        </p>
      </motion.div>

      {/* Central Birthday Cake & Glowing Candle Scene */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 py-6">
        {/* Candle Flame & Wick */}
        <div className="relative flex flex-col items-center mb-1 cursor-pointer" onClick={handleBlowCandle}>
          {!isCandleBlown ? (
            <motion.div
              className="candle-flame cursor-pointer hover:scale-125 transition-transform"
              title="Click to blow out the candle"
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                rotate: [0, 1.5, -1, 1, 0],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          ) : (
            <div className="w-4 h-8 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/60 smoke-puff" />
            </div>
          )}
          <div className="candle-wick" />
        </div>

        {/* Candle Stick */}
        <div
          onClick={handleBlowCandle}
          className="relative w-5 h-16 rounded-t-sm bg-gradient-to-b from-champagne via-[#FFF4D4] to-champagne/80 shadow-[0_0_15px_rgba(232,201,138,0.5)] cursor-pointer"
        >
          {/* Subtle decorative gold spiral stripes */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,166,184,0.3)_50%,transparent_75%)] bg-[size:10px_10px]" />
        </div>

        {/* Cake Tier 1 (Top) */}
        <div className="w-44 sm:w-56 h-16 rounded-t-2xl bg-gradient-to-b from-[#2A2033] via-[#1E1724] to-[#16101B] border-t-2 border-champagne/40 shadow-soft-depth flex items-center justify-center relative overflow-hidden -mt-1">
          <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-roseAccent/40 via-champagne/50 to-roseAccent/40 rounded-b-lg" />
          <div className="flex gap-4">
            <Heart className="w-3.5 h-3.5 text-roseAccent/60 fill-roseAccent/30" />
            <Sparkles className="w-3.5 h-3.5 text-champagne/60" />
            <Heart className="w-3.5 h-3.5 text-roseAccent/60 fill-roseAccent/30" />
          </div>
        </div>

        {/* Cake Tier 2 (Bottom) */}
        <div className="w-64 sm:w-80 h-24 rounded-t-3xl bg-gradient-to-b from-[#33253F] via-[#241A2D] to-[#18111E] border-t-2 border-champagne/50 shadow-soft-depth flex flex-col items-center justify-center relative overflow-hidden -mt-1">
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-champagne/40 via-roseAccent/40 to-champagne/40 rounded-b-xl" />
          <p className="font-display italic text-lg sm:text-xl text-champagne tracking-widest mt-2">
            {birthdayData.recipient.name}
          </p>
        </div>

        {/* Cake Stand Base */}
        <div className="w-72 sm:w-96 h-4 rounded-full bg-gradient-to-r from-white/10 via-champagne/40 to-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
        <div className="w-24 sm:w-32 h-6 bg-gradient-to-b from-white/10 to-transparent rounded-b-xl" />

        {/* Blow Action Prompt Button */}
        {!isCandleBlown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={handleBlowCandle}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-roseAccent via-champagne to-roseAccent text-background font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase hover:shadow-rose-glow transition-all duration-300 hover:scale-105 active:scale-95"
              data-cursor="open"
            >
              <span>Blow Out The Candle</span>
              <Sparkles className="w-4 h-4 text-background" />
            </button>

            <button
              onClick={handleToggleMic}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                isMicActive
                  ? 'bg-roseAccent/20 text-roseAccent border border-roseAccent shadow-rose-glow'
                  : 'glass-pill text-storyText-secondary hover:text-storyText-primary'
              }`}
              title="Use microphone to blow into your mic"
            >
              {isMicActive ? (
                <>
                  <Mic className="w-3.5 h-3.5 text-roseAccent animate-pulse" />
                  <span>Listening for blow...</span>
                </>
              ) : (
                <>
                  <MicOff className="w-3.5 h-3.5" />
                  <span>Enable Mic Blow</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer Info */}
      <div className="z-10 text-xs text-storyText-muted text-center pb-2">
        {isCandleBlown
          ? "✨ The wish has been released into the stars."
          : "Tap the candle or button when you're ready with your wish."}
      </div>

      {/* Celebration Reveal Modal */}
      <AnimatePresence>
        {showCelebrationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl glass-panel-elevated p-8 sm:p-12 shadow-soft-depth border border-white/20 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-champagne to-roseAccent mx-auto flex items-center justify-center shadow-champagne-glow">
                <Heart className="w-8 h-8 text-background fill-background" />
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-4xl sm:text-5xl text-storyText-primary font-normal leading-tight">
                  {birthdayData.finale.wishCelebrationHeadline}
                </h3>
                <p className="font-sans text-storyText-secondary text-sm sm:text-base leading-relaxed">
                  {birthdayData.finale.wishCelebrationSubline}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={onProceedToLetter}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-roseAccent via-champagne to-roseAccent text-background font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase hover:shadow-rose-glow transition-all duration-300 hover:scale-[1.02]"
                  data-cursor="open"
                >
                  <span>Read Your Birthday Letter</span>
                  <ArrowRight className="w-4 h-4 text-background" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
