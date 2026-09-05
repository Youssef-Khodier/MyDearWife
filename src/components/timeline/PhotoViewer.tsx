import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { TimelineImage } from "../../types";

interface PhotoViewerProps {
  image: TimelineImage | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalImages?: number;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
  image,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  currentIndex,
  totalImages,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext],
  );

  useEffect(() => {
    if (image) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [image, handleKeyDown]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {image && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-[#1A0D18]/85 backdrop-blur-md"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Backdrop Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer"
            onClick={onClose}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 focus:outline-none border border-white/20 cursor-pointer shadow-lg"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous / Next Controls */}
          {hasPrev && onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all backdrop-blur-sm focus:outline-none border border-white/20 cursor-pointer shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {hasNext && onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all backdrop-blur-sm focus:outline-none border border-white/20 cursor-pointer shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl max-h-[85vh] z-10 flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2 border-2 border-[#F48FB1]/40 max-h-[75vh] flex items-center justify-center">
              <img
                src={image.src}
                alt={image.alt}
                className="w-auto h-auto max-w-full max-h-[70vh] rounded-xl object-contain select-none"
              />
            </div>

            {/* Caption & Counter */}
            <div className="mt-4 text-center space-y-1 max-w-xl px-4">
              {image.caption && (
                <p
                  dir="auto"
                  className="font-handwriting text-2xl sm:text-3xl text-white tracking-wide"
                >
                  {image.caption}
                </p>
              )}
              {currentIndex !== undefined &&
                totalImages !== undefined &&
                totalImages > 1 && (
                  <p className="text-xs font-sans uppercase tracking-widest text-[#FFD6E4]">
                    {currentIndex + 1} of {totalImages}
                  </p>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
