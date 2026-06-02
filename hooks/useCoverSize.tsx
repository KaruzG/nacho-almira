import { useEffect, useRef, useState } from "react";

export function useCoverSize<T extends HTMLElement>(aspect = 16 / 9) {
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
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect]);

  return { ref, size };
}