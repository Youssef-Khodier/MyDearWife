import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ArrowLeft, Heart, Feather, Sparkles } from 'lucide-react';
import { TimelineMemory, TimelineImage } from '../../types';
import { MemoryPhoto } from './MemoryPhoto';
import { SparkleIcon, StarIcon } from '../ui/DecorativeShapes';

interface MemoryDisplayProps {
  memory: TimelineMemory;
  index: number;
  totalCount: number;
  onPhotoClick: (image: TimelineImage, imageIndex: number, images: TimelineImage[]) => void;
  onNext: () => void;
  onPrev: () => void;
  canPrev: boolean;
  isLast: boolean;
}

export const MemoryDisplay: React.FC<MemoryDisplayProps> = ({
  memory,
  index,
  totalCount,
  onPhotoClick,
  onNext,
  onPrev,
  canPrev,
  isLast,
}) => {
  const isMilestone = memory.type === 'milestone';
  const hasSubSections = memory.subSections && memory.subSections.length > 0;
  const hasPhotos = memory.images && memory.images.length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* CASE 1: MULTI-SECTION YEARS (Section 1 & Section 2 under each other on the SAME page) */}
          {hasSubSections ? (
            <div className="space-y-10">
              {/* Year Overview Header */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 border border-[#F48FB1] shadow-sm">
                  <SparkleIcon className="w-3.5 h-3.5 text-[#D81B60]" />
                  <span className="text-xs font-sans uppercase tracking-widest text-[#D81B60] font-bold">
                    {memory.year} • Two Chapters
                  </span>
                  <StarIcon className="w-3.5 h-3.5 text-[#D81B60]" />
                </div>
                <h2
                  dir="auto"
                  className="font-display text-3xl sm:text-5xl text-[#1A0D18] font-bold"
                >
                  {memory.title}
                </h2>
                <p
                  dir="auto"
                  className="font-sans text-[#381E30] text-sm sm:text-base leading-relaxed font-medium"
                >
                  {memory.description}
                </p>
              </div>

              {/* Sub-Sections Stacked Under Each Other */}
              <div className="space-y-12">
                {memory.subSections!.map((subSec, subIdx) => (
                  <div key={subSec.id || subIdx} className="space-y-4">
                    {/* Section Separator & Badge */}
                    <div className="flex items-center justify-center gap-4 py-1">
                      <div className="h-px bg-gradient-to-r from-transparent via-[#F48FB1] to-transparent flex-1" />
                      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFEAF2] border border-[#F48FB1] text-xs font-sans font-bold text-[#D81B60] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
                        <span>{subSec.sectionName}</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-[#F48FB1] to-transparent flex-1" />
                    </div>

                    {/* Section Content: 2 Columns (Photo + Story) */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 bg-white/60 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-[#F8BBD0]/80 shadow-[0_8px_30px_rgba(216,27,96,0.06)]">
                      {/* Left: Polaroid / Collage */}
                      <div className="w-full lg:w-1/2 flex justify-center">
                        <MemoryPhoto
                          images={subSec.images}
                          caption={subSec.caption}
                          onPhotoClick={(imgIdx) =>
                            onPhotoClick(subSec.images[imgIdx], imgIdx, subSec.images)
                          }
                        />
                      </div>

                      {/* Right: Sub-Section Narrative */}
                      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                        <div className="flex items-center gap-2 text-xs text-[#5C354E] font-sans font-medium">
                          {subSec.location && (
                            <div className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                              <span dir="auto">{subSec.location}</span>
                            </div>
                          )}
                        </div>

                        <h3
                          dir="auto"
                          className="font-display text-2xl sm:text-3xl text-[#1A0D18] font-bold"
                        >
                          {subSec.title}
                        </h3>

                        <p
                          dir="auto"
                          className="font-sans text-[#381E30] text-base sm:text-base leading-relaxed font-medium max-w-lg"
                        >
                          {subSec.description}
                        </p>

                        {subSec.quote && (
                          <div className="border-l-2 border-[#D81B60]/50 pl-3 py-1 max-w-lg text-left">
                            <p
                              dir="ltr"
                              className="font-display italic text-lg sm:text-xl text-[#D81B60] font-medium leading-relaxed"
                            >
                              "{subSec.quote}"
                            </p>
                            {subSec.quoteSource && (
                              <p
                                dir="ltr"
                                className="font-sans text-xs tracking-wider text-[#8E5B75] mt-1 font-semibold"
                              >
                                — {subSec.quoteSource}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Navigation Controls */}
              <div className="pt-6 flex items-center justify-center gap-3 w-full">
                {canPrev && (
                  <button
                    onClick={onPrev}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D81B60] hover:bg-[#FFEAF2] text-[#D81B60] font-sans font-bold text-xs sm:text-xs tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95 focus:outline-none cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span>Previous</span>
                  </button>
                )}

                <button
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-8 sm:px-9 py-3.5 rounded-full font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 bg-[#D81B60] hover:bg-[#B80058] text-white shadow-[0_6px_20px_rgba(216,27,96,0.3)] hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                >
                  <span>{isLast ? "The Love Letter 💌" : 'Next Memory'}</span>
                  {isLast ? (
                    <SparkleIcon className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
              </div>
            </div>
          ) : hasPhotos ? (
            /* CASE 2: SINGLE-SECTION WITH PHOTOS (2024, 2025, 2026) */
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
              {/* Left Column: Polaroid Keepsake Photo */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <MemoryPhoto
                  images={memory.images}
                  caption={memory.caption}
                  onPhotoClick={(imgIdx) =>
                    onPhotoClick(memory.images[imgIdx], imgIdx, memory.images)
                  }
                />
              </div>

              {/* Right Column: Story Narrative */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                {/* Header Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#F48FB1] shadow-sm">
                  {isMilestone ? (
                    <>
                      <StarIcon className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span className="text-xs font-sans uppercase tracking-widest text-[#D81B60] font-bold">
                        Today • {memory.year}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-sans uppercase tracking-widest text-[#D81B60] font-bold">
                        {memory.year}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60]" />
                      <span className="text-xs font-sans tracking-wider text-[#1A0D18] font-semibold">
                        Memory {index + 1} of {totalCount}
                      </span>
                    </>
                  )}
                </div>

                {/* Date & Location */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[#5C354E] font-sans font-medium">
                  <div className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span dir="auto">{memory.date}</span>
                  </div>
                  {memory.location && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#F48FB1]" />
                      <div className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                        <span dir="auto">{memory.location}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Story Title */}
                <h2
                  dir="auto"
                  className="font-display text-3xl sm:text-4xl text-[#1A0D18] font-bold leading-tight"
                >
                  {memory.title}
                </h2>

                {/* Story Arabic Description */}
                <p
                  dir="auto"
                  className="font-sans text-[#381E30] text-base sm:text-base leading-relaxed font-medium max-w-lg"
                >
                  {memory.description}
                </p>

                {/* Romantic Quote */}
                {memory.quote && (
                  <div className="border-l-2 border-[#D81B60]/50 pl-3 py-1 max-w-lg text-left">
                    <p
                      dir="ltr"
                      className="font-display italic text-lg sm:text-xl text-[#D81B60] font-medium leading-relaxed"
                    >
                      "{memory.quote}"
                    </p>
                    {memory.quoteSource && (
                      <p
                        dir="ltr"
                        className="font-sans text-xs tracking-wider text-[#8E5B75] mt-1 font-semibold"
                      >
                        — {memory.quoteSource}
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="pt-3 flex items-center justify-center lg:justify-start gap-3 w-full">
                  {canPrev && (
                    <button
                      onClick={onPrev}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D81B60] hover:bg-[#FFEAF2] text-[#D81B60] font-sans font-bold text-xs sm:text-xs tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95 focus:outline-none cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span>Previous</span>
                    </button>
                  )}

                  <button
                    onClick={onNext}
                    className="inline-flex items-center gap-2 px-8 sm:px-9 py-3.5 rounded-full font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 bg-[#D81B60] hover:bg-[#B80058] text-white shadow-[0_6px_20px_rgba(216,27,96,0.3)] hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                  >
                    <span>{isLast ? "The Love Letter 💌" : 'Next Memory'}</span>
                    {isLast ? (
                      <SparkleIcon className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CASE 3: NO PHOTOS (2019-2021) Centered Romantic Keepsake Card */
            <div className="max-w-2xl mx-auto">
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-10 text-center shadow-[0_15px_45px_rgba(216,27,96,0.12)] border-2 border-[#F48FB1] space-y-6">
                {/* Cute Washi Tape Decor */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#FF80AB]/75 backdrop-blur-sm rounded-sm -rotate-1 border-l-2 border-r-2 border-[#D81B60]/30 shadow-sm z-20" />

                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF5F8] border border-[#F48FB1] shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-[#D81B60] fill-[#D81B60]" />
                  <span className="text-xs font-sans uppercase tracking-widest text-[#D81B60] font-bold">
                    {memory.year} • Memory {index + 1} of {totalCount}
                  </span>
                  <StarIcon className="w-3.5 h-3.5 text-[#D81B60]" />
                </div>

                {/* Date & Location */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#5C354E] font-sans font-medium">
                  <div className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
                    <span dir="auto">{memory.date}</span>
                  </div>
                  {memory.location && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#F48FB1]" />
                      <div className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                        <span dir="auto">{memory.location}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Story Title */}
                <div className="space-y-1">
                  <h2
                    dir="auto"
                    className="font-display text-3xl sm:text-5xl text-[#1A0D18] font-bold leading-tight"
                  >
                    {memory.title}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 text-xs font-sans text-[#7E57C2] font-semibold">
                    <Feather className="w-3.5 h-3.5 text-[#7E57C2]" />
                    <span>• Words From the Heart</span>
                  </div>
                </div>

                {/* Story Arabic Description */}
                <div className="px-2 sm:px-6">
                  <p
                    dir="auto"
                    className="font-sans text-[#2B1525] text-lg sm:text-xl leading-loose font-medium"
                  >
                    {memory.description}
                  </p>
                </div>

                {/* Prominent Romantic Quote */}
                {memory.quote && (
                  <div className="pt-2 pb-1 px-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF0F5] border border-[#F8BBD0] text-center">
                      <p
                        dir="ltr"
                        className="font-display italic text-xl sm:text-2xl text-[#D81B60] font-semibold leading-relaxed"
                      >
                        "{memory.quote}"
                      </p>
                      {memory.quoteSource && (
                        <p
                          dir="ltr"
                          className="font-sans text-xs sm:text-sm tracking-wider text-[#8E5B75] mt-2 font-semibold"
                        >
                          — {memory.quoteSource}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="pt-3 flex items-center justify-center gap-3 w-full border-t border-[#F8BBD0]/60">
                  {canPrev && (
                    <button
                      onClick={onPrev}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#D81B60] hover:bg-[#FFEAF2] text-[#D81B60] font-sans font-bold text-xs sm:text-xs tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95 focus:outline-none cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#D81B60]" />
                      <span>Previous</span>
                    </button>
                  )}

                  <button
                    onClick={onNext}
                    className="inline-flex items-center gap-2 px-8 sm:px-9 py-3.5 rounded-full font-sans font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 bg-[#D81B60] hover:bg-[#B80058] text-white shadow-[0_6px_20px_rgba(216,27,96,0.3)] hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                  >
                    <span>{isLast ? "The Love Letter 💌" : 'Next Memory'}</span>
                    {isLast ? (
                      <SparkleIcon className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
