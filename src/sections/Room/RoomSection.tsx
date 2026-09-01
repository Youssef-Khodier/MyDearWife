import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Camera, BookOpen, Flower2, Gift, Sparkles, X, ArrowRight, Eye } from 'lucide-react';
import { birthdayData } from '../../data/birthdayData';
import { RoomObject } from '../../types';
import { soundEngine } from '../../lib/soundEngine';

interface RoomSectionProps {
  onProceedToHub: () => void;
}

export const RoomSection: React.FC<RoomSectionProps> = ({ onProceedToHub }) => {
  const [selectedObject, setSelectedObject] = useState<RoomObject | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [hasInteracted, setHasInteracted] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Flower2': return <Flower2 className="w-5 h-5" />;
      case 'Gift': return <Gift className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSelectObject = (obj: RoomObject) => {
    setSelectedObject(obj);
    setDiscoveredIds(prev => new Set(prev).add(obj.id));
    setHasInteracted(true);
    soundEngine.playChime(659.25);
  };

  const handleCloseModal = () => {
    setSelectedObject(null);
  };

  const handleProceed = () => {
    soundEngine.playChime(523.25);
    onProceedToHub();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-background">
      {/* Ambient Lighting & Moving Sunlight Beam */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[650px] bg-gradient-to-b from-champagne/10 via-roseAccent/5 to-transparent rotate-12 blur-2xl transform origin-top animate-pulse-glow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-radial from-lavender/10 to-transparent blur-3xl" />
      </div>

      {/* Chapter Title & Opening Context */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl z-10 pt-10 sm:pt-4 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill">
          <span className="text-[10px] uppercase font-sans tracking-widest text-champagne font-semibold">
            Chapter 01
          </span>
          <span className="w-1 h-1 rounded-full bg-storyText-muted" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-storyText-secondary">
            A Normal Day
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl text-storyText-primary font-normal leading-tight">
          “But today isn’t going to be a normal day.”
        </h2>
        <p className="text-sm sm:text-base text-storyText-secondary font-sans max-w-lg">
          {birthdayData.recipient.roomPrompt}
        </p>
      </motion.div>

      {/* Interactive Room Canvas / Objects Stage */}
      <div className="relative w-full max-w-5xl mx-auto my-auto min-h-[420px] sm:min-h-[480px] rounded-3xl glass-panel-elevated p-6 sm:p-10 flex items-center justify-center shadow-soft-depth overflow-hidden z-10 border border-white/10">
        
        {/* Subtle Room Backdrop Illustration */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#12101A] via-[#1A1723] to-[#24202F] opacity-90" />
        
        {/* Architectural Sunlight Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Ambient Room Furniture & Objects */}
        <div className="relative w-full h-full min-h-[360px] sm:min-h-[400px]">
          {birthdayData.roomObjects.map((obj) => {
            const isDiscovered = discoveredIds.has(obj.id);
            const isKey = obj.storySnippet.isKeyToNextChapter;

            return (
              <motion.div
                key={obj.id}
                style={{
                  position: 'absolute',
                  left: `${obj.position.x}%`,
                  top: `${obj.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button
                  onClick={() => handleSelectObject(obj)}
                  className={`group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl transition-all duration-300 ${
                    isKey
                      ? 'bg-roseAccent/20 border-2 border-roseAccent/60 shadow-rose-glow animate-pulse'
                      : isDiscovered
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-white/5 border border-white/10 hover:border-roseAccent/40 hover:bg-white/15'
                  }`}
                  data-cursor={isKey ? 'open' : 'explore'}
                  aria-label={`Inspect ${obj.name}`}
                >
                  {/* Subtle Ping animation on undiscovered key items */}
                  {isKey && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-roseAccent opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-roseAccent" />
                    </span>
                  )}

                  <div className={`transition-transform duration-300 group-hover:scale-110 ${
                    isKey ? 'text-roseAccent' : isDiscovered ? 'text-champagne' : 'text-storyText-primary'
                  }`}>
                    {getIcon(obj.iconName)}
                  </div>

                  {/* Object Tooltip Label */}
                  <span className="mt-2 text-[11px] font-sans font-medium tracking-wide text-storyText-secondary group-hover:text-storyText-primary whitespace-nowrap">
                    {obj.name}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Discovery Progress Indicator */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs text-storyText-muted">
          <Eye className="w-3.5 h-3.5 text-roseAccent" />
          <span>Discovered {discoveredIds.size} of {birthdayData.roomObjects.length} room secrets</span>
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="flex items-center justify-between z-10 pt-4 max-w-5xl mx-auto w-full">
        <span className="text-xs text-storyText-muted">
          {hasInteracted ? "You can explore further or step outside..." : "Click any object in the room to discover memories"}
        </span>

        <button
          onClick={handleProceed}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-roseAccent via-roseAccent to-champagne text-background font-sans font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-rose-glow hover:scale-105 active:scale-95"
          data-cursor="hover"
        >
          <span>Step Into Story</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Object Inspection Modal */}
      <AnimatePresence>
        {selectedObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-3xl glass-panel-elevated p-7 sm:p-9 shadow-soft-depth border border-white/15 text-left space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full glass-pill hover:bg-white/15 text-storyText-muted hover:text-storyText-primary transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Subtitle tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                <span className="text-[10px] uppercase font-sans tracking-widest text-champagne font-medium">
                  {selectedObject.storySnippet.subtitle}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl text-storyText-primary font-normal leading-snug">
                {selectedObject.storySnippet.title}
              </h3>

              {/* Text */}
              <p className="font-sans text-storyText-secondary text-sm sm:text-base leading-relaxed">
                {selectedObject.storySnippet.text}
              </p>

              {/* Action Prompt */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                {selectedObject.storySnippet.isKeyToNextChapter ? (
                  <button
                    onClick={handleProceed}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-roseAccent text-background font-sans font-medium text-xs tracking-widest uppercase hover:shadow-rose-glow transition-all"
                  >
                    <span>{selectedObject.storySnippet.actionPrompt || "Step Outside →"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCloseModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full glass-pill text-xs font-sans tracking-wider uppercase text-storyText-primary hover:border-roseAccent/40 transition-all"
                  >
                    <span>Continue Exploring</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
