import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { MemoryItem } from '../../types';
import { soundEngine } from '../../lib/soundEngine';

interface MemoriesSectionProps {
  onBackToHub: () => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ onBackToHub }) => {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

  const handleOpenMemory = (index: number) => {
    setSelectedMemoryIndex(index);
    soundEngine.playChime(659.25);
  };

  const handleClose = () => {
    setSelectedMemoryIndex(null);
  };

  const handleNext = () => {
    if (selectedMemoryIndex !== null) {
      soundEngine.playChime(587.33);
      setSelectedMemoryIndex((selectedMemoryIndex + 1) % birthdayData.memories.length);
    }
  };

  const handlePrev = () => {
    if (selectedMemoryIndex !== null) {
      soundEngine.playChime(587.33);
      setSelectedMemoryIndex((selectedMemoryIndex - 1 + birthdayData.memories.length) % birthdayData.memories.length);
    }
  };

  const currentMemory: MemoryItem | null =
    selectedMemoryIndex !== null ? birthdayData.memories[selectedMemoryIndex] : null;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-x-hidden bg-background">
      {/* Ambience glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-radial from-roseAccent/15 via-champagne/5 to-transparent blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-radial from-lavender/10 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl z-10 pt-12 sm:pt-4 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill">
          <span className="text-[10px] uppercase font-sans tracking-widest text-roseAccent font-semibold">
            Chapter 02.A
          </span>
          <span className="w-1 h-1 rounded-full bg-storyText-muted" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-storyText-secondary">
            Memories We Lived
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl text-storyText-primary font-normal leading-tight">
          Moments Frozen in Warmth
        </h2>
        <p className="text-sm sm:text-base text-storyText-secondary font-sans max-w-lg leading-relaxed">
          Click any photograph to step back into that day and read the memory behind the lens.
        </p>
      </motion.div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto w-full my-auto z-10 py-10">
        {birthdayData.memories.map((mem, idx) => {
          // Slight playful rotation offsets
          const rotations = [-2, 1.5, -1, 2, -1.5, 1];
          const rot = rotations[idx % rotations.length];

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              whileHover={{ y: -8, scale: 1.03, rotate: 0 }}
              style={{ rotate: `${rot}deg` }}
              className="flex justify-center"
            >
              <button
                onClick={() => handleOpenMemory(idx)}
                className="group relative w-full max-w-[320px] bg-polaroid-frame rounded-2xl p-4 sm:p-5 shadow-polaroid hover:shadow-rose-glow transition-all duration-300 text-left flex flex-col"
                data-cursor="view"
              >
                {/* Photo frame */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#24202F]/10">
                  <img
                    src={mem.imageUrl}
                    alt={mem.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-sans font-medium text-white tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                      Inspect Memory
                    </span>
                  </div>
                </div>

                {/* Polaroid handwritten caption space */}
                <div className="mt-3.5 space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-polaroid-text/60 font-semibold">
                    Memory #{String(idx + 1).padStart(2, '0')} • {mem.date}
                  </span>
                  <p className="font-handwriting text-xl text-polaroid-text line-clamp-1">
                    {mem.caption}
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between z-10 pt-4 max-w-6xl mx-auto w-full">
        <button
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill text-xs uppercase tracking-widest text-storyText-secondary hover:text-storyText-primary transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Chapter Hub</span>
        </button>

        <span className="text-xs text-storyText-muted">
          6 memories preserved
        </span>
      </div>

      {/* Memory Focus Modal */}
      <AnimatePresence>
        {currentMemory && selectedMemoryIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-elevated p-6 sm:p-10 shadow-soft-depth border border-white/15 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-full glass-pill hover:bg-white/15 text-storyText-muted hover:text-storyText-primary transition-colors"
                aria-label="Close memory modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Polaroid Display */}
              <div className="bg-polaroid-frame rounded-2xl p-4 sm:p-5 shadow-polaroid max-w-[340px] mx-auto w-full">
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden">
                  <img
                    src={currentMemory.imageUrl}
                    alt={currentMemory.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3.5 space-y-1">
                  <p className="text-[10px] font-sans uppercase tracking-widest text-polaroid-text/60 font-semibold">
                    Memory #{String(selectedMemoryIndex + 1).padStart(2, '0')}
                  </p>
                  <p className="font-handwriting text-2xl text-polaroid-text">
                    {currentMemory.caption}
                  </p>
                </div>
              </div>

              {/* Right Memory Story */}
              <div className="space-y-5 text-left">
                {/* Meta info tags */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-champagne font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{currentMemory.date}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-roseAccent font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentMemory.location}</span>
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-storyText-primary font-normal leading-snug">
                  {currentMemory.title}
                </h3>

                <p className="font-sans text-storyText-secondary text-sm sm:text-base leading-relaxed">
                  {currentMemory.story}
                </p>

                {currentMemory.quote && (
                  <div className="p-4 rounded-2xl bg-white/5 border-l-2 border-roseAccent">
                    <p className="font-display italic text-base sm:text-lg text-roseAccent/90">
                      {currentMemory.quote}
                    </p>
                  </div>
                )}

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full glass-pill hover:bg-white/15 text-storyText-primary transition-colors"
                      aria-label="Previous memory"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full glass-pill hover:bg-white/15 text-storyText-primary transition-colors"
                      aria-label="Next memory"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-storyText-muted ml-2 font-sans">
                      {selectedMemoryIndex + 1} / {birthdayData.memories.length}
                    </span>
                  </div>

                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans uppercase tracking-widest text-storyText-primary transition-all"
                  >
                    <span>Back to Gallery</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
