import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { birthdayData } from "../../data/timelineData";
import { soundEngine } from "../../lib/soundEngine";
import {
  HeartIcon,
  SparkleIcon,
  StarIcon,
} from "../../components/ui/DecorativeShapes";

interface FinalMessageSectionProps {
  onRestart: () => void;
}

export const FinalMessageSection: React.FC<FinalMessageSectionProps> = ({
  onRestart,
}) => {
  const { finale, recipient } = birthdayData;

  useEffect(() => {
    soundEngine.setStageMood("final-message");
  }, []);

  const handleRestart = () => {
    soundEngine.playChime(659.25);
    onRestart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 pb-28 sm:p-8 overflow-x-hidden z-10 max-w-5xl mx-auto">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto text-center z-10 pt-4 space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-[#F48FB1] shadow-sm">
          <HeartIcon className="w-4 h-4 text-[#D81B60]" color="#D81B60" />
          <span className="text-xs uppercase font-sans tracking-widest text-[#1A0D18] font-bold">
            For {recipient.name} • {recipient.birthdayDate}
          </span>
          <StarIcon className="w-4 h-4 text-[#D81B60]" />
        </div>
      </motion.div>

      {/* Love Letter Presentation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-3xl mx-auto w-full my-6 z-10"
      >
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-12 shadow-[0_15px_45px_rgba(216,27,96,0.14)] border-2 border-[#F48FB1] space-y-8">
          {/* Header Title */}
          <div className="text-center space-y-2 pb-6 border-b border-[#F8BBD0]">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#1A0D18] font-bold leading-tight">
              Happy Birthday, {recipient.name}
            </h1>
            <p className="font-display italic text-xl sm:text-2xl text-[#D81B60] font-semibold">
              {finale.letterTitle}
            </p>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-[#2B1525] text-base sm:text-lg leading-loose font-normal">
            <p
              dir="auto"
              className="font-display text-2xl sm:text-3xl text-[#1A0D18] italic font-bold"
            >
              {finale.letterGreeting}
            </p>

            {finale.letterParagraphs.map((para, i) => (
              <p
                key={i}
                dir="auto"
                className="leading-loose font-medium text-[#2B1525]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Letter Closing & Signature */}
          <div className="pt-6 border-t border-[#F8BBD0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <p
                dir="auto"
                className="text-xs uppercase tracking-widest text-[#5C354E] font-bold"
              >
                {finale.letterClosing}
              </p>
              <p
                dir="auto"
                className="font-handwriting text-3xl sm:text-4xl text-[#D81B60] font-bold"
              >
                {finale.authorName}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#D81B60]">
              <SparkleIcon className="w-5 h-5 text-[#D81B60]" />
              <StarIcon className="w-5 h-5 text-[#D81B60]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Replay Action & Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 py-6 max-w-3xl mx-auto w-full">
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-[#D81B60] hover:bg-[#FFEAF2] text-xs uppercase tracking-widest text-[#D81B60] font-bold transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Relive Our Story from 2019</span>
        </button>

        <span className="text-xs text-[#5C354E] font-display italic font-semibold">
          "Our Story — 2019 to Today & Forever"
        </span>
      </div>
    </div>
  );
};
