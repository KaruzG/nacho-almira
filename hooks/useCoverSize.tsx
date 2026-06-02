import { useEffect, useRef, useState } from "react";

export function useCoverSize<T extends HTMLElement>(
  aspect = 16 / 9,
  overscan = 1.3 // amplía el iframe para recortar el título/barra de YouTube
) {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      let w = width;
      let h = width / aspect;
      if (h < height) {
        h = height;
        w = height * aspect;
      }
      setSize({ w: w * overscan, h: h * overscan });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect, overscan]);

  return { ref, size };
}