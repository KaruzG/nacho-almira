import type { HTMLMotionProps } from "motion/react";

export const easeInUp: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
}