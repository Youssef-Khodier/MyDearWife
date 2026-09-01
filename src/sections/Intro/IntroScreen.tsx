import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { soundEngine } from '../../lib/soundEngine';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'ready'>('loading');
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingPhase('ready'), 400);
          return 100;
        }
        return prev + 25;
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const handleBegin = () => {
    soundEngine.resume();
    soundEngine.playChime(523.25);
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      {/* Background Atmospheric Glow Rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-roseAccent/15 via-lavender/5 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[800px] h-[800px] rounded-full bg-radial from-champagne/10 via-transparent to-transparent blur-3xl pointer-events-none -bottom-40" />

      <AnimatePresence mode="wait">
        {loadingPhase === 'loading' ? (
          <motion.div
            key="loading-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 text-center max-w-md z-10"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-roseAccent/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <Sparkles className="w-6 h-6 text-roseAccent animate-pulse" />
            </div>

            <div className="space-y-2">
              <p className="font-display italic text-2xl text-storyText-primary">
                Preparing something special...
              </p>
              <p className="text-xs uppercase tracking-widest text-storyText-muted">
                Crafted for {birthdayData.recipient.name}
              </p>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-48 h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-roseAccent via-champagne to-lavender"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ready-state"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-2xl z-10 space-y-8"
          >
            {/* Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-roseAccent animate-ping" />
              <span className="text-[11px] font-sans tracking-widest uppercase text-storyText-secondary font-medium">
                A Birthday Journey • {birthdayData.recipient.birthdayDate}
              </span>
            </motion.div>

            {/* Main Cinematic Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-storyText-primary leading-[1.05]"
              >
                A Day Inside <br className="hidden sm:block" />
                <span className="italic bg-gradient-to-r from-roseAccent via-champagne to-lavender bg-clip-text text-transparent">
                  Your Story
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="font-sans text-storyText-secondary text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
              >
                Every memory, every quiet glance, and every unwritten tomorrow—woven together into an experience made just for you.
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="pt-4"
            >
              <button
                onClick={handleBegin}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-roseAccent/90 to-roseAccent hover:from-roseAccent hover:to-champagne text-background font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-rose-glow hover:scale-[1.03] active:scale-[0.98]"
                data-cursor="open"
              >
                <span>Step Inside</span>
                <Compass className="w-4 h-4 text-background group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </motion.div>

            {/* Footer Audio Tip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="text-[12px] text-storyText-muted tracking-wide"
            >
              Best experienced with sound enabled ♪
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
