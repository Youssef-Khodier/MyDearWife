import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChapterId } from './types';
import { soundEngine } from './lib/soundEngine';
import { CustomCursor } from './components/ui/CustomCursor';
import { AudioController } from './components/ui/AudioController';
import { ProgressIndicator } from './components/ui/ProgressIndicator';
import { ParticleBackground } from './components/scene/ParticleBackground';

// Section Components
import { IntroScreen } from './sections/Intro/IntroScreen';
import { RoomSection } from './sections/Room/RoomSection';
import { ChapterHub } from './sections/Hub/ChapterHub';
import { MemoriesSection } from './sections/Memories/MemoriesSection';
import { MessagesSection } from './sections/Messages/MessagesSection';
import { FutureSection } from './sections/Future/FutureSection';
import { TransitionInterlude } from './sections/Finale/TransitionInterlude';
import { CakeAndCandleSection } from './sections/Finale/CakeAndCandleSection';
import { FinalMessageSection } from './sections/Finale/FinalMessageSection';

export const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('intro');
  const [exploredChapters, setExploredChapters] = useState<Set<string>>(new Set());

  // Synchronize audio engine mood when chapter changes
  useEffect(() => {
    soundEngine.setChapterMood(currentChapter);
  }, [currentChapter]);

  const handleNavigate = (target: ChapterId) => {
    if (target === 'memories' || target === 'messages' || target === 'future') {
      setExploredChapters(prev => new Set(prev).add(target));
    }
    setCurrentChapter(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setExploredChapters(new Set());
    setCurrentChapter('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cinematic page transition variant
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(6px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      filter: 'blur(6px)',
      transition: {
        duration: 0.6,
        ease: [0.7, 0, 0.84, 0] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-[#09070D] text-[#FFF8F3] overflow-x-hidden film-grain">
      {/* Dynamic Atmospheric Particles */}
      <ParticleBackground currentChapter={currentChapter} />

      {/* Global Desktop Custom Cursor */}
      <CustomCursor />

      {/* Progress & Chapter Header Indicator */}
      <ProgressIndicator
        currentChapter={currentChapter}
        onNavigate={handleNavigate}
        exploredChapters={exploredChapters}
      />

      {/* Persistent Audio Control */}
      <AudioController />

      {/* Chapter View Transition Container */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentChapter}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen"
        >
          {currentChapter === 'intro' && (
            <IntroScreen onStart={() => handleNavigate('room')} />
          )}

          {currentChapter === 'room' && (
            <RoomSection onProceedToHub={() => handleNavigate('hub')} />
          )}

          {currentChapter === 'hub' && (
            <ChapterHub
              exploredChapters={exploredChapters}
              onSelectChapter={(ch) => handleNavigate(ch)}
              onProceedToFinale={() => handleNavigate('interlude')}
            />
          )}

          {currentChapter === 'memories' && (
            <MemoriesSection onBackToHub={() => handleNavigate('hub')} />
          )}

          {currentChapter === 'messages' && (
            <MessagesSection onBackToHub={() => handleNavigate('hub')} />
          )}

          {currentChapter === 'future' && (
            <FutureSection onBackToHub={() => handleNavigate('hub')} />
          )}

          {currentChapter === 'interlude' && (
            <TransitionInterlude onContinue={() => handleNavigate('cake')} />
          )}

          {currentChapter === 'cake' && (
            <CakeAndCandleSection onProceedToLetter={() => handleNavigate('final-letter')} />
          )}

          {currentChapter === 'final-letter' && (
            <FinalMessageSection onRestart={handleRestart} />
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default App;
