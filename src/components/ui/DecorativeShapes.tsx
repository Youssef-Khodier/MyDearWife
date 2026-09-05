import React from 'react';

export const SparkleIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L13.8 8.7C14.3 10.5 15.5 11.7 17.3 12.2L24 14L17.3 15.8C15.5 16.3 14.3 17.5 13.8 19.3L12 26L10.2 19.3C9.7 17.5 8.5 16.3 6.7 15.8L0 14L6.7 12.2C8.5 11.7 9.7 10.5 10.2 8.7L12 2Z"
      fill={color}
    />
  </svg>
);

export const StarIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L14.9 8.6L22 9.3L16.7 14.1L18.2 21.1L12 17.5L5.8 21.1L7.3 14.1L2 9.3L9.1 8.6L12 2Z"
      fill={color}
    />
  </svg>
);

export const HeartIcon: React.FC<{
  className?: string;
  color?: string;
  fill?: boolean;
}> = ({ className = 'w-4 h-4', color = 'currentColor', fill = true }) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill ? color : 'none'}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const RibbonStroke: React.FC<{ className?: string }> = ({
  className = 'w-24 h-2',
}) => (
  <svg
    viewBox="0 0 100 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2 8C25 2 45 9 68 4C82 1 92 6 98 7"
      stroke="#FF78AE"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const BirthdayFlagIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = '#FF78AE',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 2v20M4 3l14 5-14 5V3z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
