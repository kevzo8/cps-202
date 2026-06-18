'use client';

import { ThemeProvider } from './theme-provider';
import PresentationContent from './presentation-content';

export default function PresentationWrapper() {
  return (
    <ThemeProvider>
      <PresentationContent />
    </ThemeProvider>
  );
}
