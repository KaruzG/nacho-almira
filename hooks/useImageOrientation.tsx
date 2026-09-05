import { useState, useEffect } from 'react';

type Orientation = 'horizontal' | 'square' | null;

export function useImageOrientation(src: string) {
  const [orientation, setOrientation] = useState<Orientation>(null);

  useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    img.onload = () => {
      // Consider an image horizontal if its width is significantly greater than its height.
      // E.g., ratio > 1.2. Otherwise, treat it as a square/vertical that occupies 1 column.
      if (img.width > img.height * 1.2) {
        setOrientation('horizontal');
      } else {
        setOrientation('square');
      }
    };
    img.onerror = () => setOrientation('square');
    img.src = src;
    return () => { img.onload = null; img.onerror = null; };
  }, [src]);

  return orientation;
}
