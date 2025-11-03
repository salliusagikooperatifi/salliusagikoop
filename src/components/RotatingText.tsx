// components/RotatingText.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  texts?: string[];
  intervalMs?: number;
};

const DEFAULT_TEXTS = [
  "Köyümüzde ve bölgemizde kırsal kalkınma ile üretim, istihdam ve katma değer yaratmak için el ele veriyor, yarınlara hazırlanıyoruz.",
  "Kooperatifimiz; köyümüz ve bölgemizi üretim ve istihdamda devletin teşvik ve desteklerinden yararlandırarak projeler geliştirmek amacıyla kurulmuştur.",
  "Doğaya ve emeğe değer veriyor, ürettiklerimizi yurt dışı pazarlara taşıyarak köyümüze gelir kaynağı sağlamayı hedefliyoruz.",
];

export default function RotatingText({
  texts = DEFAULT_TEXTS,
  intervalMs = 4000,
}: Props) {
  const [index, setIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [texts.length, intervalMs]);

  const variants = {
    enter: { opacity: 0, y: shouldReduce ? 0 : 8 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduce ? 0 : -8 },
  };

  return (
    <div
      aria-live="polite"
      className="relative h-24 md:h-28 flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-xl md:text-2xl max-w-3xl mx-auto text-white text-center"
        >
          {texts[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
