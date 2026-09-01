import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ChapterId } from '../../types';
import { soundEngine } from '../../lib/soundEngine';

interface ChapterHubProps {
  exploredChapters: Set<string>;
  onSelectChapter: (chapter: ChapterId) => void;
  onProceedToFinale: () => void;
}

export const ChapterHub: React.FC<ChapterHubProps> = ({
  exploredChapters,
  onSelectChapter,
  onProceedToFinale,
}) => {
  const chapters = [
    {
      id: 'memories' as ChapterId,
      key: 'memories',
      num: '01',
      title: 'Memories',
      tagline: 'Things we’ve already lived.',
      icon: <Camera className="w-6 h-6" />,
      color: 'from-roseAccent/20 to-roseAccent/5',
      borderColor: 'hover:border-roseAccent/60 hover:shadow-rose-glow',
      accentColor: 'text-roseAccent',
      bgGlow: 'bg-roseAccent/15',
    },
    {
      id: 'messages' as ChapterId,
      key: 'messages',
      num: '02',
      title: 'Things I Want to Tell You',
      tagline: 'Things I don’t say often enough.',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-champagne/20 to-champagne/5',
      borderColor: 'hover:border-champagne/60 hover:shadow-champagne-glow',
      accentColor: 'text-champagne',
      bgGlow: 'bg-champagne/15',
    },
    {
      id: 'future' as ChapterId,
      key: 'future',
      num: '03',
      title: 'Our Future',
      tagline: 'Things we haven’t experienced yet.',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-lavender/20 to-lavender/5',
      borderColor: 'hover:border-lavender/60 hover:shadow-lavender-glow',
      accentColor: 'text-lavender',
      bgGlow: 'bg-lavender/15',
    },
  ];

  const allCompleted = chapters.every((c) => exploredChapters.has(c.key));

  const handleCardClick = (chapterId: ChapterId) => {
    soundEngine.playChime(587.33);
    onSelectChapter(chapterId);
  };

  const handleFinale = () => {
    soundEngine.playChime(659.25);
    onProceedToFinale();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-lavender/10 via-roseAccent/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl z-10 pt-10 sm:pt-4 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill">
          <span className="text-[10px] uppercase font-sans tracking-widest text-lavender font-semibold">
            Chapter Selection
          </span>
          <span className="w-1 h-1 rounded-full bg-storyText-muted" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-storyText-secondary">
            {exploredChapters.size} of 3 Explored
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl text-storyText-primary font-normal leading-tight">
          Where Do We Go?
        </h2>
        <p className="text-sm sm:text-base text-storyText-secondary font-sans max-w-lg leading-relaxed">
          Choose a path to explore. You can journey through our memories, read words from my heart, or look toward tomorrow.
        </p>
      </motion.div>

      {/* 3 Portal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full my-auto z-10 py-6">
        {chapters.map((ch, idx) => {
          const isExplored = exploredChapters.has(ch.key);

          return (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 * idx }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="h-full"
            >
              <button
                onClick={() => handleCardClick(ch.id)}
                className={`group relative w-full h-full text-left rounded-3xl glass-panel-elevated p-8 flex flex-col justify-between transition-all duration-300 border border-white/10 ${ch.borderColor}`}
                data-cursor="explore"
              >
                {/* Top Chapter Tag & Explored Check */}
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-sans font-semibold tracking-widest uppercase ${ch.accentColor}`}>
                    Part {ch.num}
                  </span>
                  {isExplored ? (
                    <div className="flex items-center gap-1 text-[11px] font-sans text-champagne bg-champagne/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Explored</span>
                    </div>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-roseAccent transition-colors" />
                  )}
                </div>

                {/* Center Icon & Content */}
                <div className="space-y-4 my-8">
                  <div className={`w-14 h-14 rounded-2xl ${ch.bgGlow} flex items-center justify-center ${ch.accentColor} transition-transform duration-300 group-hover:scale-110`}>
                    {ch.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl text-storyText-primary font-normal group-hover:text-roseAccent transition-colors">
                      {ch.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-storyText-secondary leading-relaxed">
                      {ch.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom Enter prompt */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-sans font-medium uppercase tracking-wider text-storyText-muted group-hover:text-storyText-primary transition-colors">
                  <span>Enter Chapter</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer / Finale Unlock Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 pt-4 max-w-5xl mx-auto w-full">
        <div className="text-xs text-storyText-muted text-center sm:text-left">
          {allCompleted
            ? "✨ All chapters have been explored! The story threshold is now open."
            : `Explore all 3 chapters (${exploredChapters.size}/3 completed) to unlock the birthday finale.`}
        </div>

        {allCompleted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleFinale}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-champagne via-roseAccent to-champagne text-background font-sans font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-champagne-glow hover:scale-105 active:scale-95"
            data-cursor="open"
          >
            <span>Proceed to Finale</span>
            <Sparkles className="w-4 h-4 text-background" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
