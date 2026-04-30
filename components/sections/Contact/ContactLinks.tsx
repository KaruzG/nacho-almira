"use client"

import Button from "@/components/ui/Button";
import { motion, Variants } from "motion/react";
import { FiMail, FiInstagram } from "react-icons/fi";

export default function ContactLinks() {
  const container : Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item : Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col sm:flex-row gap-6 w-full justify-center"
    >
      <motion.div variants={item} className="w-full sm:w-auto">
        <Button 
          label="Email me"
          href="mailto:hello@nachoalmira.com"
          variant="secondary"
          size="lg"
          className="w-full flex items-center gap-3"
        >
          <FiMail size={20} />
          EMAIL ME
        </Button>
      </motion.div>
      <motion.div variants={item} className="w-full sm:w-auto">
        <Button 
          label="Instagram"
          href="https://instagram.com/nachoalmira"
          target="_blank"
          variant="secondary"
          size="lg"
          className="w-full flex items-center gap-3"
        >
          <FiInstagram size={20} />
          INSTAGRAM
        </Button>
      </motion.div>
    </motion.div>
  );
}
