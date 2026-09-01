import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { soundEngine } from '../../lib/soundEngine';

interface MessagesSectionProps {
  onBackToHub: () => void;
}

export const MessagesSection: React.FC<MessagesSectionProps> = ({ onBackToHub }) => {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  const currentMessage = birthdayData.messages[activeMessageIndex];
  const fullText = currentMessage.content.join('\n\n');

  // Typewriter animation effect
  useEffect(() => {
    setDisplayedChars(0);
    setIsTypingComplete(false);

    let charCount = 0;
    const interval = setInterval(() => {
      charCount += 2;
      setDisplayedChars(charCount);

      if (charCount % 6 === 0) {
        soundEngine.playTypewriterClick();
      }

      if (charCount >= fullText.length) {
        clearInterval(interval);
        setDisplayedChars(fullText.length);
        setIsTypingComplete(true);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [activeMessageIndex, fullText]);

  const handleSelectMessage = (index: number) => {
    if (index === activeMessageIndex) return;
    soundEngine.playChime(523.25);
    setActiveMessageIndex(index);
  };

  const handleNextMessage = () => {
    const nextIdx = (activeMessageIndex + 1) % birthdayData.messages.length;
    soundEngine.playChime(587.33);
    setActiveMessageIndex(nextIdx);
  };

  const handleSkipTyping = () => {
    setDisplayedChars(fullText.length);
    setIsTypingComplete(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-x-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-radial from-champagne/10 via-roseAccent/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl z-10 pt-12 sm:pt-4 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill">
          <span className="text-[10px] uppercase font-sans tracking-widest text-champagne font-semibold">
            Chapter 02.B
          </span>
          <span className="w-1 h-1 rounded-full bg-storyText-muted" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-storyText-secondary">
            Things I Want to Tell You
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl text-storyText-primary font-normal leading-tight">
          Words I Hold In My Heart
        </h2>
        <p className="text-sm sm:text-base text-storyText-secondary font-sans max-w-lg leading-relaxed">
          The thoughts and gratitude that linger in the quiet moments.
        </p>
      </motion.div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2.5 overflow-x-auto py-3 max-w-5xl mx-auto w-full z-10 no-scrollbar">
        {birthdayData.messages.map((msg, idx) => {
          const isActive = idx === activeMessageIndex;
          return (
            <button
              key={msg.id}
              onClick={() => handleSelectMessage(idx)}
              className={`px-4 py-2 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-roseAccent text-background font-medium shadow-rose-glow scale-105'
                  : 'glass-pill text-storyText-secondary hover:text-storyText-primary hover:border-roseAccent/40'
              }`}
            >
              {msg.categoryLabel}
            </button>
          );
        })}
      </div>

      {/* Typewriter Parchment Letter Card */}
      <div className="max-w-3xl mx-auto w-full my-auto z-10 py-6">
        <motion.div
          key={currentMessage.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl glass-panel-elevated p-8 sm:p-12 shadow-soft-depth border border-white/15 min-h-[340px] flex flex-col justify-between"
          onClick={!isTypingComplete ? handleSkipTyping : undefined}
        >
          {/* Subtle Paper Texture Stamp */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span className="text-[11px] font-sans uppercase tracking-widest text-champagne font-medium">
                {currentMessage.categoryLabel}
              </span>
            </div>

            <span className="text-xs text-storyText-muted font-sans">
              Letter #{activeMessageIndex + 1} of {birthdayData.messages.length}
            </span>
          </div>

          {/* Letter Title & Content with Typewriter cursor */}
          <div className="py-6 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl text-storyText-primary font-normal">
              {currentMessage.title}
            </h3>

            <div className="font-sans text-storyText-secondary text-base sm:text-lg leading-relaxed whitespace-pre-line font-light">
              {fullText.slice(0, displayedChars)}
              {!isTypingComplete && <span className="typewriter-cursor" />}
            </div>

            {isTypingComplete && currentMessage.signature && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="pt-4"
              >
                <p className="font-handwriting text-2xl text-roseAccent">
                  — {currentMessage.signature}
                </p>
              </motion.div>
            )}
          </div>

          {/* Bottom Card Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-xs text-storyText-muted">
              {!isTypingComplete ? (
                <span className="cursor-pointer hover:text-storyText-primary transition-colors">
                  (Click anywhere on card to reveal immediately)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-champagne">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Message complete</span>
                </span>
              )}
            </div>

            <button
              onClick={handleNextMessage}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-storyText-primary text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:border-champagne/40 hover:shadow-champagne-glow"
              data-cursor="hover"
            >
              <span>Tell me something else</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
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
          Written with love
        </span>
      </div>
    </div>
  );
};
