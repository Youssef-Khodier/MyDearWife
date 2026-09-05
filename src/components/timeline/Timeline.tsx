import React, { useState, useEffect, useCallback } from 'react';
import { TimelineMemory, TimelineImage } from '../../types';
import { TimelineRail } from './TimelineRail';
import { MemoryDisplay } from './MemoryDisplay';
import { PhotoViewer } from './PhotoViewer';
import { soundEngine } from '../../lib/soundEngine';

interface TimelineProps {
  timeline: TimelineMemory[];
  onCompleteTimeline: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  timeline,
  onCompleteTimeline,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState<{
    image: TimelineImage;
    index: number;
    images: TimelineImage[];
  } | null>(null);

  // Synchronize audio mood when active memory changes
  useEffect(() => {
    const currentItem = timeline[activeIndex];
    if (currentItem) {
      soundEngine.setStageMood('timeline', currentItem.year);
    }
  }, [activeIndex, timeline]);

  const handleSelectYear = (index: number) => {
    soundEngine.playTap();
    setActiveIndex(index);
  };

  const handleNext = useCallback(() => {
    if (activeIndex < timeline.length - 1) {
      soundEngine.playChime(659.25);
      setActiveIndex((prev) => prev + 1);
    } else {
      soundEngine.playChime(783.99);
      onCompleteTimeline();
    }
  }, [activeIndex, timeline.length, onCompleteTimeline]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      soundEngine.playTap();
      setActiveIndex((prev) => prev - 1);
    }
  }, [activeIndex]);

  // Arrow key navigation for desktop comfort
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto) return; // Don't trigger if viewing a photo
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, activePhoto]);

  const handlePhotoClick = (
    image: TimelineImage,
    imageIndex: number,
    images: TimelineImage[]
  ) => {
    soundEngine.playChime(587.33);
    setActivePhoto({ image, index: imageIndex, images });
  };

  const handleCloseViewer = () => {
    setActivePhoto(null);
  };

  const handleViewerPrev = () => {
    if (!activePhoto || activePhoto.index <= 0) return;
    const newIdx = activePhoto.index - 1;
    soundEngine.playTap();
    setActivePhoto({
      image: activePhoto.images[newIdx],
      index: newIdx,
      images: activePhoto.images,
    });
  };

  const handleViewerNext = () => {
    if (!activePhoto || activePhoto.index >= activePhoto.images.length - 1) return;
    const newIdx = activePhoto.index + 1;
    soundEngine.playTap();
    setActivePhoto({
      image: activePhoto.images[newIdx],
      index: newIdx,
      images: activePhoto.images,
    });
  };

  const currentMemory = timeline[activeIndex] || timeline[0];

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col justify-between py-6 px-4 z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1 pt-2 pb-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1A0D18] tracking-wide">
          Our Story
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#5C354E] font-medium">
          A little journey through time • 2019 to Today
        </p>
      </div>

      {/* Sleek Horizontal Year Pills */}
      <div className="w-full my-3">
        <TimelineRail
          timeline={timeline}
          activeIndex={activeIndex}
          onSelectYear={handleSelectYear}
        />
      </div>

      {/* Single Active Memory Display */}
      <div className="flex-1 flex items-center justify-center my-auto w-full">
        <MemoryDisplay
          memory={currentMemory}
          index={activeIndex}
          totalCount={timeline.length}
          onPhotoClick={handlePhotoClick}
          onNext={handleNext}
          onPrev={handlePrev}
          canPrev={activeIndex > 0}
          isLast={activeIndex === timeline.length - 1}
        />
      </div>

      {/* Lightbox Photo Viewer Modal */}
      <PhotoViewer
        image={activePhoto ? activePhoto.image : null}
        onClose={handleCloseViewer}
        onPrev={handleViewerPrev}
        onNext={handleViewerNext}
        hasPrev={activePhoto ? activePhoto.index > 0 : false}
        hasNext={
          activePhoto
            ? activePhoto.index < activePhoto.images.length - 1
            : false
        }
        currentIndex={activePhoto?.index}
        totalImages={activePhoto?.images.length}
      />
    </div>
  );
};
