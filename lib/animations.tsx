"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, type Transition } from "framer-motion";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────
export function useScrollReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      options
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

// ─── Staggered Children Hook ────────────────────────────────────────────────
export function useStaggeredItems(count: number, delay = 0.1) {
  return Array.from({ length: count }, (_, i) => ({
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: i * delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }));
}

// ─── Shared Variants ──────────────────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Motion Components ────────────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
      transition={delay ? { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Hover Scale Wrapper ──────────────────────────────────────────────────
export function HoverScale({
  children,
  scale = 1.03,
  className,
}: {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter Animation ─────────────────────────────────────────────────────
export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const steps = 60;
          const increment = (to - from) / steps;
          const stepTime = (duration * 1000) / steps;
          let current = from;
          const timer = setInterval(() => {
            current += increment;
            if (current >= to) {
              setCount(to);
              clearInterval(timer);
            } else {
              setCount(Math.round(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}