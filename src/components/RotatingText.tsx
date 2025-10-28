// components/RotatingText.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  texts?: string[];
  intervalMs?: number;
};

const DEFAULT_TEXTS = [
  "Bölgemizde sürdürülebilir tarım ve üretim faaliyetlerini destekleyerek, üyelerimizin refahını artırmayı ve toplumsal kalkınmaya katkıda bulunmayı hedefliyoruz.",
  "Doğaya ve emeğe değer veriyor, yerel üretimi güçlendirerek gelecek nesillere daha yaşanabilir bir çevre bırakmak için çalışıyoruz.",
  "Birlikte üretiyor, birlikte büyüyoruz. Kooperatif ruhuyla kırsal kalkınmayı destekleyip bölgesel ekonomiye güç katıyoruz.",
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
