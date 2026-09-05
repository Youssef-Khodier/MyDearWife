import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

export const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const handleToggle = () => {
    const nextState = soundEngine.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      soundEngine.playChime();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#F48FB1] text-xs tracking-wider uppercase font-bold text-[#1A0D18] hover:border-[#D81B60] transition-all duration-300 shadow-[0_4px_16px_rgba(216,27,96,0.18)] group focus:outline-none cursor-pointer"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      title={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-[#5C354E] group-hover:text-[#D81B60] transition-colors" />
          <span className="hidden sm:inline text-xs text-[#5C354E] font-sans font-bold">Muted</span>
        </>
      ) : (
        <>
          <div className="flex items-center gap-0.5 sm:gap-1 h-3">
            <span className="w-1 h-2.5 bg-[#D81B60] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-1 h-3.5 sm:h-4 bg-[#B80058] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s]" />
            <span className="w-1 h-2 bg-[#D81B60] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
          </div>
          <Volume2 className="w-4 h-4 text-[#D81B60]" />
          <span className="hidden sm:inline text-xs tracking-wider text-[#1A0D18] font-sans font-bold">Sound On</span>
        </>
      )}
    </button>
  );
};
