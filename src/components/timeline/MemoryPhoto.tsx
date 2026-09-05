import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { TimelineImage } from '../../types';
import { resolveAsset } from '../../lib/assets';

interface MemoryPhotoProps {
  images: TimelineImage[];
  caption?: string;
  onPhotoClick: (index: number) => void;
}

export const MemoryPhoto: React.FC<MemoryPhotoProps> = ({
  images,
  caption,
  onPhotoClick,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'collage'>('collage');
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  // Reset state when images change (year change) - default to collage if multiple images exist
  useEffect(() => {
    setSelectedImageIndex(0);
    setViewMode(images.length > 1 ? 'collage' : 'single');
  }, [images]);

  // Auto scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbnailRef.current && thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const thumb = activeThumbnailRef.current;
      const thumbLeft = thumb.offsetLeft;
      const thumbWidth = thumb.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [selectedImageIndex]);

  if (!images || images.length === 0) return null;

  const currentImage = images[selectedImageIndex] || images[0];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* View Mode Toggle (Collage as Main, Polaroid as Second) */}
      {images.length > 1 && (
        <div className="flex items-center gap-1.5 mb-3 p-1 rounded-full bg-white/90 border border-[#F8BBD0] shadow-sm z-20">
          <button
            onClick={() => setViewMode('collage')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wider transition-all duration-200 focus:outline-none cursor-pointer ${
              viewMode === 'collage'
                ? 'bg-[#D81B60] text-white shadow-sm'
                : 'text-[#5C354E] hover:text-[#D81B60]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Collage ({images.length})</span>
          </button>

          <button
            onClick={() => setViewMode('single')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wider transition-all duration-200 focus:outline-none cursor-pointer ${
              viewMode === 'single'
                ? 'bg-[#D81B60] text-white shadow-sm'
                : 'text-[#5C354E] hover:text-[#D81B60]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Polaroid</span>
          </button>
        </div>
      )}

      {/* SINGLE POLAROID VIEW */}
      {viewMode === 'single' ? (
        <>
          <div className="relative max-w-[380px] sm:max-w-[430px] w-full">
            {/* Cute Washi Tape Decor */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#FF80AB]/80 backdrop-blur-sm rounded-sm -rotate-1 border-l-2 border-r-2 border-[#D81B60]/30 shadow-sm z-20" />

            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_35px_rgba(216,27,96,0.14)] border border-[#F8BBD0]"
            >
              {/* Main Photo Area - Portrait proportioned with blurred fill so NO cropping occurs! */}
              <div
                onClick={() => onPhotoClick(selectedImageIndex)}
                className="relative w-full aspect-[3/4] max-h-[440px] sm:max-h-[480px] rounded-xl overflow-hidden bg-[#FFEAF2] cursor-pointer group select-none flex items-center justify-center"
              >
                {/* Layer 1: Ambient soft blur fill of the image to gracefully fill any border */}
                <img
                  src={resolveAsset(currentImage.src)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-125 opacity-40 select-none pointer-events-none"
                />

                {/* Layer 2: Complete, uncropped foreground photo */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage.src}
                    src={resolveAsset(currentImage.src)}
                    alt={currentImage.alt}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-contain drop-shadow-sm group-hover:scale-102 transition-transform duration-500"
                  />
                </AnimatePresence>

                {/* In-Photo Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 focus:outline-none shadow-md"
                      aria-label="Previous photo"
                      title="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 focus:outline-none shadow-md"
                      aria-label="Next photo"
                      title="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Photo Counter Pill */}
                    <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[11px] font-sans font-bold tracking-wider shadow-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}

                {/* Expand Overlay Hint */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2.5 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 text-white text-xs font-sans font-medium px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <Maximize2 className="w-3 h-3" />
                    <span>Tap to expand full screen</span>
                  </span>
                </div>
              </div>

              {/* Photo Caption / Handwriting Note */}
              <div className="mt-3 text-center px-2">
                <p
                  dir="auto"
                  className="font-handwriting text-xl sm:text-2xl text-[#1A0D18] font-bold line-clamp-1"
                >
                  {currentImage.caption || caption}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Multi-Photo Thumbnail Ribbon */}
          {images.length > 1 && (
            <div
              ref={thumbnailContainerRef}
              className="flex items-center gap-2 mt-3 px-2 max-w-[380px] sm:max-w-[430px] w-full overflow-x-auto scrollbar-none py-1.5 z-10"
            >
              {images.map((img, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={idx}
                    ref={isSelected ? activeThumbnailRef : null}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative shrink-0 w-11 h-13 sm:w-12 sm:h-15 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none cursor-pointer bg-[#FFEAF2] ${
                      isSelected
                        ? 'border-[#D81B60] shadow-[0_4px_12px_rgba(216,27,96,0.35)] scale-105'
                        : 'border-white/90 opacity-65 hover:opacity-100 hover:scale-102'
                    }`}
                    title={img.caption || `Photo ${idx + 1}`}
                  >
                    <img
                      src={resolveAsset(img.src)}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D81B60]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* COLLAGE VIEW: Only the images in divs with no inner scrolling */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[440px] sm:max-w-[480px]"
        >
          <div
            className={`grid gap-2.5 sm:gap-3 py-1 ${
              images.length > 4 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'
            }`}
          >
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => onPhotoClick(idx)}
                className="relative cursor-pointer rounded-2xl overflow-hidden aspect-[3/4] bg-[#FFEAF2] border border-[#F8BBD0]/80 shadow-[0_4px_16px_rgba(216,27,96,0.1)] group"
              >
                <img
                  src={resolveAsset(img.src)}
                  alt={img.alt || `Photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
