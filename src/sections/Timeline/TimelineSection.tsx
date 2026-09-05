import React from 'react';
import { Timeline } from '../../components/timeline/Timeline';
import { birthdayData } from '../../data/timelineData';

interface TimelineSectionProps {
  onProceedToFinale: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  onProceedToFinale,
}) => {
  return (
    <Timeline
      timeline={birthdayData.timeline}
      onCompleteTimeline={onProceedToFinale}
    />
  );
};
