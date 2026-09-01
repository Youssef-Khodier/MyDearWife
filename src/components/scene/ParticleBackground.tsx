import React, { useEffect, useRef } from 'react';
import { ChapterId } from '../../types';

interface ParticleBackgroundProps {
  currentChapter: ChapterId;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  speedX: number;
  speedY: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ currentChapter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getParticleConfig = (chapter: ChapterId) => {
      let count = isMobile ? 35 : 85;
      if (prefersReducedMotion) count = 15;

      let colors = ['rgba(239, 166, 184, 0.4)', 'rgba(232, 201, 138, 0.35)', 'rgba(255, 248, 243, 0.3)'];
      let speedScale = 0.4;
      let sizeRange = [1, 3];

      switch (chapter) {
        case 'intro':
        case 'room':
          colors = ['rgba(232, 201, 138, 0.35)', 'rgba(255, 248, 243, 0.25)', 'rgba(246, 198, 213, 0.25)'];
          speedScale = 0.25;
          sizeRange = [1, 2.8];
          break;
        case 'hub':
          colors = ['rgba(239, 166, 184, 0.4)', 'rgba(185, 167, 216, 0.4)', 'rgba(232, 201, 138, 0.35)'];
          speedScale = 0.35;
          break;
        case 'memories':
          colors = ['rgba(239, 166, 184, 0.45)', 'rgba(246, 198, 213, 0.35)', 'rgba(232, 201, 138, 0.4)'];
          speedScale = 0.3;
          sizeRange = [1.2, 3.5];
          break;
        case 'messages':
          colors = ['rgba(255, 248, 243, 0.25)', 'rgba(246, 198, 213, 0.2)', 'rgba(207, 198, 208, 0.2)'];
          speedScale = 0.18;
          sizeRange = [0.8, 2.2];
          break;
        case 'future':
          count = isMobile ? 60 : 130;
          colors = ['rgba(185, 167, 216, 0.6)', 'rgba(246, 198, 213, 0.5)', 'rgba(255, 255, 255, 0.7)'];
          speedScale = 0.3;
          sizeRange = [0.8, 3.2];
          break;
        case 'interlude':
          count = 15;
          colors = ['rgba(255, 248, 243, 0.15)'];
          speedScale = 0.1;
          break;
        case 'cake':
        case 'final-letter':
          colors = ['rgba(232, 201, 138, 0.5)', 'rgba(239, 166, 184, 0.45)', 'rgba(255, 248, 243, 0.5)'];
          speedScale = 0.35;
          sizeRange = [1.2, 3.8];
          break;
      }

      return { count, colors, speedScale, sizeRange };
    };

    const initParticles = () => {
      const config = getParticleConfig(currentChapter);
      particles = [];
      for (let i = 0; i < config.count; i++) {
        const size = config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]);
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const baseAlpha = 0.2 + Math.random() * 0.6;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha,
          alpha: baseAlpha,
          speedX: (Math.random() - 0.5) * config.speedScale,
          speedY: -Math.random() * config.speedScale - 0.1,
          color,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Subtle twinkling pulsation
        const twinkle = Math.sin(frame * p.twinkleSpeed + p.twinkleOffset);
        p.alpha = Math.max(0.05, Math.min(1, p.baseAlpha + twinkle * 0.25));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d\.]+\)$/g, `${p.alpha})`);
        ctx.fill();

        // Optional gentle glow aura for larger particles
        if (p.size > 2.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(/[\d\.]+\)$/g, `${p.alpha * 0.2})`);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentChapter]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
