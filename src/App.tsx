import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExperienceStage } from './types';
import { soundEngine } from './lib/soundEngine';
import { AudioController } from './components/ui/AudioController';
import { BackgroundBlobs } from './components/ui/BackgroundBlobs';

// Section Components
import { IntroSection } from './sections/Intro/IntroSection';
import { TimelineSection } from './sections/Timeline/TimelineSection';
import { FinalMessageSection } from './sections/Finale/FinalMessageSection';

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<ExperienceStage>('intro');

  // Synchronize audio engine mood when stage changes
  useEffect(() => {
    soundEngine.setStageMood(currentStage);
  }, [currentStage]);

  const handleNavigate = (target: ExperienceStage) => {
    soundEngine.playTap();
    setCurrentStage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    soundEngine.playChime(659.25);
    setCurrentStage('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soft view transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
      filter: 'blur(3px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: 'blur(3px)',
      transition: {
        duration: 0.25,
        ease: [0.7, 0, 0.84, 0] as [number, number, number, number],
      },
    },
  };

  const navItems: { stage: ExperienceStage; label: string; icon?: string }[] = [
    { stage: 'intro', label: 'Welcome' },
    { stage: 'timeline', label: 'Our Story (2019-2026)' },
    { stage: 'final-message', label: 'Love Letter 💌' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#FFF5F8] text-[#1A0D18] overflow-x-hidden selection:bg-[#FFD6E4] selection:text-[#1A0D18]">
      {/* Soft Ambient Pastel Background Blobs */}
      <BackgroundBlobs currentStage={currentStage} />

      {/* Persistent Audio Controller (Bottom Right) */}
      <AudioController />

      {/* Floating Header Navigation (visible on stages after intro, or subtle) */}
      {currentStage !== 'intro' && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-3 z-40 w-full flex justify-center px-4 pointer-events-none"
        >
          <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#F48FB1] shadow-[0_4px_20px_rgba(216,27,96,0.1)]">
            {navItems.map((item) => {
              const isActive = currentStage === item.stage;

              return (
                <button
                  key={item.stage}
                  onClick={() => handleNavigate(item.stage)}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-sans font-bold tracking-wider transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-[#D81B60] text-white shadow-sm scale-102'
                      : 'text-[#5C354E] hover:text-[#D81B60] hover:bg-[#FFEAF2]/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </motion.header>
      )}

      {/* Main Stage View Transition Container */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentStage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full min-h-screen z-10 flex flex-col justify-center"
        >
          {currentStage === 'intro' && (
            <IntroSection onStart={() => handleNavigate('timeline')} />
          )}

          {currentStage === 'timeline' && (
            <TimelineSection
              onProceedToFinale={() => handleNavigate('final-message')}
            />
          )}

          {currentStage === 'final-message' && (
            <FinalMessageSection onRestart={handleRestart} />
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default App;
