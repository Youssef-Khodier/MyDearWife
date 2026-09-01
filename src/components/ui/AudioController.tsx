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
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-pill text-xs tracking-wider uppercase font-medium text-storyText-secondary hover:text-storyText-primary transition-all duration-300 hover:border-roseAccent/40 hover:shadow-rose-glow group"
      aria-label={isMuted ? 'Unmute atmospheric audio' : 'Mute audio'}
      data-cursor="hover"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-storyText-muted group-hover:text-roseAccent transition-colors" />
          <span className="text-[11px] text-storyText-muted">Muted</span>
        </>
      ) : (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-roseAccent rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 h-3 bg-roseAccent rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-1.5 bg-roseAccent rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
          </div>
          <Volume2 className="w-3.5 h-3.5 text-roseAccent" />
          <span className="text-[11px] tracking-widest text-storyText-primary">Atmosphere</span>
        </>
      )}
    </button>
  );
};
