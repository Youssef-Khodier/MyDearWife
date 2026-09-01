import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ChapterId } from '../../types';
import { soundEngine } from '../../lib/soundEngine';

interface ProgressIndicatorProps {
  currentChapter: ChapterId;
  onNavigate: (target: ChapterId) => void;
  exploredChapters?: Set<string>;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentChapter,
  onNavigate,
}) => {
  if (currentChapter === 'intro') return null;

  const getChapterInfo = () => {
    switch (currentChapter) {
      case 'room':
        return { num: '01', title: 'A NORMAL DAY', canGoBack: false, backTarget: null, backLabel: '' };
      case 'hub':
        return { num: '02', title: 'WHERE DO WE GO?', canGoBack: true, backTarget: 'room' as ChapterId, backLabel: 'The Room' };
      case 'memories':
        return { num: '02.A', title: 'MEMORIES', canGoBack: true, backTarget: 'hub' as ChapterId, backLabel: 'Chapter Hub' };
      case 'messages':
        return { num: '02.B', title: 'THINGS I WANT TO TELL YOU', canGoBack: true, backTarget: 'hub' as ChapterId, backLabel: 'Chapter Hub' };
      case 'future':
        return { num: '02.C', title: 'OUR FUTURE', canGoBack: true, backTarget: 'hub' as ChapterId, backLabel: 'Chapter Hub' };
      case 'interlude':
        return { num: '03', title: 'THE THRESHOLD', canGoBack: false, backTarget: null, backLabel: '' };
      case 'cake':
        return { num: '04', title: 'MAKE A WISH', canGoBack: false, backTarget: null, backLabel: '' };
      case 'final-letter':
        return { num: '★', title: 'HAPPY BIRTHDAY', canGoBack: false, backTarget: null, backLabel: '' };
      default:
        return { num: '', title: '', canGoBack: false, backTarget: null, backLabel: '' };
    }
  };

  const { num, title, canGoBack, backTarget, backLabel } = getChapterInfo();

  const handleBack = () => {
    if (backTarget) {
      soundEngine.playChime(440);
      onNavigate(backTarget);
    }
  };

  return (
    <nav aria-label="Experience progress" className="fixed top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
      {/* Left Chapter Badge & Back navigation */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {canGoBack && backTarget && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs tracking-wider font-medium text-storyText-secondary hover:text-storyText-primary transition-all duration-300 hover:border-roseAccent/30 hover:shadow-rose-glow group"
            data-cursor="hover"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[11px] uppercase tracking-widest">{backLabel}</span>
          </button>
        )}

        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-roseAccent">
            {num}
          </span>
          <span className="w-1 h-1 rounded-full bg-storyText-muted" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-storyText-secondary font-medium">
            {title}
          </span>
        </div>
      </div>

      {/* Right Story Mark */}
      <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill backdrop-blur-md opacity-60">
        <span className="text-[10px] font-display italic tracking-widest text-storyText-primary">
          A Day Inside Your Story
        </span>
      </div>
    </nav>
  );
};
