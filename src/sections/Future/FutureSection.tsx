import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sun, Sparkles, Heart, ArrowLeft, Star, X } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { FutureMoment } from '../../types';
import { soundEngine } from '../../lib/soundEngine';

interface FutureSectionProps {
  onBackToHub: () => void;
}

export const FutureSection: React.FC<FutureSectionProps> = ({ onBackToHub }) => {
  const [selectedMoment, setSelectedMoment] = useState<FutureMoment | null>(null);

  const getSymbolIcon = (symbol: string) => {
    switch (symbol) {
      case 'Compass': return <Compass className="w-6 h-6 text-lavender" />;
      case 'Sun': return <Sun className="w-6 h-6 text-champagne" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-roseAccent" />;
      case 'Heart': return <Heart className="w-6 h-6 text-roseAccent-soft" />;
      default: return <Star className="w-6 h-6 text-lavender" />;
    }
  };

  const handleCardClick = (moment: FutureMoment) => {
    soundEngine.playChime(659.25);
    setSelectedMoment(moment);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-x-hidden bg-background">
      {/* Dreamy Nebula & Star Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[650px] h-[650px] bg-radial from-lavender/15 via-roseAccent/5 to-transparent blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-radial from-champagne/10 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl z-10 pt-12 sm:pt-4 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill">
          <span className="text-[10px] uppercase font-sans tracking-widest text-lavender font-semibold">
            Chapter 02.C
          </span>
          <span className="w-1 h-1 rounded-full bg-storyText-muted" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-storyText-secondary">
            Our Future
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl text-storyText-primary font-normal leading-tight">
          “There are still so many memories we haven’t made yet.”
        </h2>
        <p className="text-sm sm:text-base text-storyText-secondary font-sans max-w-lg leading-relaxed">
          The unwritten chapters waiting for us just beyond the horizon.
        </p>
      </motion.div>

      {/* Future Constellation Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full my-auto z-10 py-8">
        {birthdayData.futureMoments.map((fut, idx) => {
          return (
            <motion.div
              key={fut.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 * idx }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <button
                onClick={() => handleCardClick(fut)}
                className="group relative w-full h-full text-left rounded-3xl glass-panel-elevated p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border border-white/10 hover:border-lavender/50 hover:shadow-lavender-glow"
                data-cursor="explore"
              >
                {/* Header Tag & Symbol */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-lavender/80">
                    {fut.tag}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-white/5 group-hover:bg-white/15 transition-all">
                    {getSymbolIcon(fut.symbol)}
                  </div>
                </div>

                {/* Content */}
                <div className="my-6 space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl text-storyText-primary font-normal group-hover:text-lavender transition-colors">
                    {fut.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-storyText-secondary leading-relaxed line-clamp-3">
                    {fut.description}
                  </p>
                </div>

                {/* Promise Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="font-handwriting text-lg text-champagne">
                    “{fut.promise}”
                  </p>
                  <Sparkles className="w-4 h-4 text-lavender/60 group-hover:text-lavender transition-colors" />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between z-10 pt-4 max-w-5xl mx-auto w-full">
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill text-xs uppercase tracking-widest text-storyText-secondary hover:text-storyText-primary transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Chapter Hub</span>
        </button>

        <span className="text-xs text-storyText-muted">
          Constellations of tomorrow
        </span>
      </div>

      {/* Moment Detail Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl glass-panel-elevated p-8 sm:p-10 shadow-soft-depth border border-white/15 text-left space-y-6"
            >
              <button
                onClick={() => setSelectedMoment(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass-pill hover:bg-white/15 text-storyText-muted hover:text-storyText-primary transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-lavender/10">
                  {getSymbolIcon(selectedMoment.symbol)}
                </div>
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-lavender font-semibold">
                    {selectedMoment.tag}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-storyText-primary font-normal">
                    {selectedMoment.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-storyText-secondary text-base leading-relaxed">
                {selectedMoment.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border-l-2 border-champagne">
                <span className="text-[10px] uppercase tracking-widest text-champagne font-sans block mb-1">
                  A Promise For Us
                </span>
                <p className="font-handwriting text-2xl text-storyText-primary">
                  {selectedMoment.promise}
                </p>
              </div>

              <button
                onClick={() => setSelectedMoment(null)}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans uppercase tracking-widest text-storyText-primary transition-all"
              >
                Keep Dream In Heart
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
