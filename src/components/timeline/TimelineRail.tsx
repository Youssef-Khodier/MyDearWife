import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TimelineMemory } from "../../types";
import { SparkleIcon } from "../ui/DecorativeShapes";

interface TimelineRailProps {
  timeline: TimelineMemory[];
  activeIndex: number;
  maxUnlockedIndex?: number;
  onSelectYear: (index: number) => void;
}

export const TimelineRail: React.FC<TimelineRailProps> = ({
  timeline,
  activeIndex,
  onSelectYear,
}) => {
  const railContainerRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active year into view horizontally on mobile
  useEffect(() => {
    if (activePillRef.current && railContainerRef.current) {
      const container = railContainerRef.current;
      const pill = activePillRef.current;
      const pillLeft = pill.offsetLeft;
      const pillWidth = pill.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: pillLeft - containerWidth / 2 + pillWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-2">
      <div
        ref={railContainerRef}
        className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none py-2 px-3 rounded-full bg-white/80 backdrop-blur-md border border-[#F48FB1] shadow-[0_4px_20px_rgba(216,27,96,0.08)]"
      >
        {timeline.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isMilestone = item.type === "milestone";

          return (
            <button
              key={item.id}
              ref={isActive ? activePillRef : null}
              onClick={() => onSelectYear(idx)}
              className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-bold tracking-wider transition-all duration-300 whitespace-nowrap focus:outline-none ${
                isActive
                  ? "bg-[#D81B60] text-white shadow-[0_4px_14px_rgba(216,27,96,0.35)] scale-105"
                  : "text-[#5C354E] hover:text-[#D81B60] hover:bg-[#FFEAF2]/80"
              }`}
            >
              {isMilestone && (
                <SparkleIcon
                  className={`w-3 h-3 ${isActive ? "text-white" : "text-[#D81B60]"}`}
                />
              )}
              <span>{isMilestone ? "Today" : item.year}</span>
              {isActive && (
                <motion.span
                  layoutId="activePillGlow"
                  className="absolute inset-0 rounded-full border-2 border-white/40 pointer-events-none"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
