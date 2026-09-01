import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'explore' | 'view' | 'open'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorState(cursorAttr as 'default' | 'hover' | 'explore' | 'view' | 'open');
      } else if (target.closest('button, a, input, [role="button"], .interactive-target')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const getCursorLabel = () => {
    switch (cursorState) {
      case 'explore': return 'Explore';
      case 'view': return 'View';
      case 'open': return 'Open';
      default: return '';
    }
  };

  const isExpanded = cursorState !== 'default';
  const label = getCursorLabel();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle glow circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-roseAccent/30 bg-roseAccent/5 backdrop-blur-[2px] flex items-center justify-center pointer-events-none transition-all duration-150"
        style={{
          boxShadow: '0 0 20px rgba(239, 166, 184, 0.25)',
        }}
        animate={{
          x: pos.x - (isExpanded ? (label ? 40 : 24) : 16),
          y: pos.y - (isExpanded ? (label ? 40 : 24) : 16),
          width: isExpanded ? (label ? 80 : 48) : 32,
          height: isExpanded ? (label ? 80 : 48) : 32,
          scale: isExpanded ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
      >
        {label && (
          <span className="text-[10px] uppercase font-sans tracking-widest text-roseAccent font-medium select-none">
            {label}
          </span>
        )}
      </motion.div>

      {/* Center sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-roseAccent pointer-events-none shadow-[0_0_8px_#EFA6B8]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: label ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.2 }}
      />
    </div>
  );
};
