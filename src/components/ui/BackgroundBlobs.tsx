import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExperienceStage } from '../../types';

interface BackgroundBlobsProps {
  currentStage: ExperienceStage;
  currentYear?: number | string;
}

export const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({
  currentStage,
  currentYear = 2019,
}) => {
  const numericYear =
    typeof currentYear === 'string'
      ? parseInt(currentYear.slice(0, 4), 10)
      : currentYear;

  const colors = useMemo(() => {
    switch (currentStage) {
      case 'intro':
        return {
          blob1: 'bg-[#FFD6E4]/45', // soft rose
          blob2: 'bg-[#FFF0A8]/40', // soft warm cream
          blob3: 'bg-[#E1BEE7]/35', // soft lavender
        };
      case 'timeline':
        if (numericYear <= 2021) {
          return {
            blob1: 'bg-[#FFE0B2]/40',
            blob2: 'bg-[#FFD6E4]/40',
            blob3: 'bg-[#FFF9C4]/35',
          };
        } else if (numericYear <= 2024) {
          return {
            blob1: 'bg-[#E1BEE7]/40',
            blob2: 'bg-[#FFD6E4]/45',
            blob3: 'bg-[#B3E5FC]/35',
          };
        } else {
          return {
            blob1: 'bg-[#F48FB1]/35',
            blob2: 'bg-[#FFF59D]/45',
            blob3: 'bg-[#FFE082]/35',
          };
        }
      case 'birthday-reveal':
        return {
          blob1: 'bg-[#FFD6E4]/50',
          blob2: 'bg-[#FFF9C4]/50',
          blob3: 'bg-[#E1BEE7]/40',
        };
      case 'birthday':
      case 'final-message':
        return {
          blob1: 'bg-[#F48FB1]/40',
          blob2: 'bg-[#FFF59D]/50',
          blob3: 'bg-[#CE93D8]/45',
        };
    }
  }, [currentStage, currentYear]);

  // Floating ambient micro-particles (hearts & sparkles)
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: (i * 7.3) % 95,
      y: (i * 9.7 + 5) % 90,
      size: (i % 3) + 2,
      duration: 12 + (i % 6) * 3,
      delay: (i % 4) * 1.5,
      isHeart: i % 3 === 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Floating Pastel Blob */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -top-28 -left-28 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full blur-3xl transition-colors duration-1000 ${colors.blob1}`}
      />

      {/* Top Right Floating Blob */}
      <motion.div
        animate={{
          x: [0, -35, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.94, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/4 -right-32 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full blur-3xl transition-colors duration-1000 ${colors.blob2}`}
      />

      {/* Bottom Center Floating Blob */}
      <motion.div
        animate={{
          x: [0, 25, -35, 0],
          y: [0, -30, 35, 0],
          scale: [1, 1.09, 0.93, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -bottom-36 left-1/3 -translate-x-1/2 w-[520px] sm:w-[720px] h-[520px] sm:h-[720px] rounded-full blur-3xl transition-colors duration-1000 ${colors.blob3}`}
      />

      {/* Floating Gentle Micro Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, -80, -120],
            opacity: [0, 0.6, 0.8, 0],
            scale: [0.8, 1.2, 1, 0.6],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.isHeart ? (
            <svg
              className="w-3.5 h-3.5 text-[#F48FB1]/50"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <span
              className="block rounded-full bg-[#FFB74D]/40"
              style={{ width: p.size * 2, height: p.size * 2 }}
            />
          )}
        </motion.div>
      ))}

      {/* Subtle delicate grain/dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            'radial-gradient(#F48FB1 0.75px, transparent 0.75px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
};
