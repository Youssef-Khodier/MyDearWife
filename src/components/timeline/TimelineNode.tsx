import React from 'react';
import { motion } from 'framer-motion';
import { TimelineMemory } from '../../types';
import { SparkleIcon, StarIcon } from '../ui/DecorativeShapes';

interface TimelineNodeProps {
  memory: TimelineMemory;
  index?: number;
  isCurrent: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
  onSelect: () => void;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  memory,
  isCurrent,
  isCompleted,
  isUnlocked,
  onSelect,
}) => {
  const isMilestone = memory.type === 'milestone';

  return (
    <button
      onClick={() => {
        if (isUnlocked) onSelect();
      }}
      disabled={!isUnlocked}
      aria-label={`Go to year ${memory.year}`}
      className={`group relative flex flex-col items-center flex-shrink-0 transition-all duration-300 focus:outline-none ${
        isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
      }`}
    >
      {/* Node Circle */}
      <div className="relative flex items-center justify-center">
        {/* Pulsating outer ring for current active year */}
        {isCurrent && (
          <motion.div
            layoutId="active-ring"
            className="absolute -inset-2.5 rounded-full border-2 border-[#D81B60] bg-[#D81B60]/20 animate-ping opacity-75"
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Node Circle Body */}
        <div
          className={`relative z-10 flex items-center justify-center transition-all duration-300 rounded-full ${
            isCurrent
              ? 'w-7 h-7 bg-[#D81B60] text-white shadow-md scale-110 border-2 border-white'
              : isCompleted
              ? 'w-6 h-6 bg-[#D81B60] text-white hover:bg-[#B80058]'
              : 'w-6 h-6 bg-white border-2 border-[#F48FB1]'
          }`}
        >
          {isMilestone ? (
            <StarIcon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-[#D81B60]'}`} />
          ) : isCompleted ? (
            <span className="w-2 h-2 rounded-full bg-white" />
          ) : isCurrent ? (
            <SparkleIcon className="w-3.5 h-3.5 text-white" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-[#F48FB1]" />
          )}
        </div>
      </div>

      {/* Year Label */}
      <div className="mt-2 flex flex-col items-center">
        <span
          className={`text-xs font-sans tracking-wider transition-colors duration-200 select-none ${
            isCurrent
              ? 'font-bold text-[#D81B60] scale-105'
              : isCompleted
              ? 'font-bold text-[#1A0D18]'
              : 'font-semibold text-[#5C354E]'
          }`}
        >
          {isMilestone ? 'Today' : memory.year}
        </span>
      </div>
    </button>
  );
};
