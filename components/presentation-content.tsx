'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './theme-provider';

// Import slide components
import TitleSlide from './slides/title-slide';
import AgendaSlide from './slides/agenda-slide';
import ScopeSlide from './slides/scope-slide';
import FindingSlide from './slides/finding-slide';
import FindingsDetailedSlide from './slides/findings-detailed-slide';
import ImpactSlide from './slides/impact-slide';
import TimelineSlide from './slides/timeline-slide';
import TopRecommendationsSlide from './slides/top-recommendations-slide';
import ToolingEcosystemSlide from './slides/tooling-ecosystem-slide';
import RecommendationSlide from './slides/recommendation-slide';
import NextStepsSlide from './slides/next-steps-slide';

const slides = [
  { id: 0, component: TitleSlide, title: 'Title' },
  { id: 1, component: AgendaSlide, title: 'Agenda' },
  { id: 2, component: ScopeSlide, title: 'Assessment Scope' },
  { id: 3, component: FindingSlide, title: 'Key Findings' },
  { id: 4, component: FindingsDetailedSlide, title: 'Security Findings Explained' },
  { id: 5, component: ImpactSlide, title: 'Business Impact' },
  { id: 6, component: TimelineSlide, title: 'Implementation Timeline' },
  { id: 7, component: TopRecommendationsSlide, title: 'Top Recommendations' },
  { id: 8, component: ToolingEcosystemSlide, title: 'Complete Tooling Ecosystem' },
  { id: 9, component: RecommendationSlide, title: 'Strategic Roadmap' },
  { id: 10, component: NextStepsSlide, title: 'Next Steps & Q&A' },
];

export default function PresentationContent() {
  const { theme, toggleTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-50">
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const newSlide = currentSlide > 0 ? currentSlide - 1 : currentSlide;
                setDirection(-1);
                setCurrentSlide(newSlide);
              }}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              disabled={currentSlide === 0}
              title="Click to go to previous slide"
            >
              ←
            </button>
            <input
              type="number"
              min="1"
              max={slides.length}
              value={currentSlide + 1}
              onChange={(e) => {
                const page = Math.max(1, Math.min(slides.length, parseInt(e.target.value) || 1)) - 1;
                setDirection(page > currentSlide ? 1 : -1);
                setCurrentSlide(page);
              }}
              className="w-8 text-center text-sm font-semibold bg-muted text-foreground rounded px-1 py-0.5 border border-border hover:border-primary transition-colors cursor-pointer"
              title="Click or type to jump to a slide"
            />
            <button
              onClick={() => {
                const newSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : currentSlide;
                setDirection(1);
                setCurrentSlide(newSlide);
              }}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              disabled={currentSlide === slides.length - 1}
              title="Click to go to next slide"
            >
              →
            </button>
            <span className="text-xs font-semibold text-muted-foreground">
              / {slides.length}
            </span>
          </div>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-muted hover:bg-muted/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                title={`Slide ${idx + 1}: ${slides[idx].title}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
        <button
          onClick={toggleTheme}
          type="button"
          className="p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all text-primary"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>
        <div className="text-xs text-muted-foreground opacity-60">
          Use ← → arrows | click dots to jump
        </div>
      </div>
    </div>
  );
}
