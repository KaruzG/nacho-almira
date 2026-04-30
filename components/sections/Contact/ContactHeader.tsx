"use client"

import Title from "@/components/ui/Title";
import { motion } from "motion/react";

export default function ContactHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="flex flex-col gap-6"
    >
      <Title>LET&apos;S WORK TOGETHER</Title>
      <p className="text-secondary-dark text-lg md:text-xl font-light max-w-[600px] mx-auto">
        Feel free to reach out for collaborations, inquiries, or just to say hi. I am always open to discussing new projects and creative ideas.
      </p>
    </motion.div>
  );
}
