import React from "react";
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  yOffset = 40,
  duration = 0.8,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.4,
      }}
      transition={{
        duration: duration,
        delay: delay,
        /* Custom cinematic cubic-bezier (ultra smooth acceleration and deceleration) */
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
