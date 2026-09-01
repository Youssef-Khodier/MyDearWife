import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { soundEngine } from '../../lib/soundEngine';

interface FinalMessageSectionProps {
  onRestart: () => void;
}

export const FinalMessageSection: React.FC<FinalMessageSectionProps> = ({ onRestart }) => {
  const { finale, recipient } = birthdayData;

  const handleCelebrateAgain = () => {
    soundEngine.playCelebrationFanfare();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#EFA6B8', '#F6C6D5', '#E8C98A', '#FFF8F3'],
    });
  };

  const handleRestart = () => {
    soundEngine.playChime(523.25);
    onRestart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-x-hidden bg-background">
      {/* Soft Ambient Rose & Golden Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-roseAccent/10 via-champagne/5 to-transparent blur-3xl" />
      </div>

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto text-center z-10 pt-10 sm:pt-4 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill">
          <Heart className="w-3.5 h-3.5 text-roseAccent fill-roseAccent" />
          <span className="text-[11px] uppercase font-sans tracking-widest text-storyText-primary font-medium">
            For {recipient.name} • {recipient.birthdayDate}
          </span>
        </div>
      </motion.div>

      {/* Central Love Letter Parchment */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="max-w-3xl mx-auto w-full my-auto z-10 py-8"
      >
        <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-14 shadow-soft-depth border border-white/15 space-y-8">
          {/* Header Title */}
          <div className="text-center space-y-3 pb-6 border-b border-white/10">
            <h1 className="font-display text-4xl sm:text-6xl text-storyText-primary font-normal leading-tight">
              Happy Birthday, {recipient.name}
            </h1>
            <p className="font-display italic text-lg sm:text-2xl text-roseAccent">
              {finale.letterTitle}
            </p>
          </div>

          {/* Letter Body */}
          <div className="space-y-5 font-sans text-storyText-secondary text-base sm:text-lg leading-relaxed font-light">
            <p className="font-display text-xl sm:text-2xl text-storyText-primary italic">
              {finale.letterGreeting}
            </p>

            {finale.letterParagraphs.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Letter Closing & Signature */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-sans uppercase tracking-widest text-storyText-muted">
                {finale.letterClosing}
              </p>
              <p className="font-handwriting text-3xl sm:text-4xl text-champagne">
                {finale.authorName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCelebrateAgain}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-roseAccent/20 hover:bg-roseAccent/30 text-roseAccent border border-roseAccent/40 text-xs font-sans uppercase tracking-wider transition-all duration-300 hover:shadow-rose-glow"
                data-cursor="hover"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Celebrate</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Replay & Footer */}
      <div className="flex items-center justify-between z-10 pt-4 max-w-3xl mx-auto w-full">
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill text-xs uppercase tracking-widest text-storyText-secondary hover:text-storyText-primary transition-all duration-300"
          data-cursor="hover"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Relive Story from Beginning</span>
        </button>

        <span className="text-xs text-storyText-muted font-display italic">
          “A Day Inside Your Story”
        </span>
      </div>
    </div>
  );
};
