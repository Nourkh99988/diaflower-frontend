"use client";
import { useEffect, useRef, useState, CSSProperties, ReactNode } from "react";
import { motion, useInView, useAnimation, useTransform, animate, useMotionValue } from "framer-motion";
import { liServices, navbar, order, rotate, titleVariants } from "./variant";
import Image, { StaticImageData } from "next/image";

interface MotionProps {
  children: ReactNode;
  className?: string;
}

export function DivMotion({ children, className }: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    }
  }, [isInView, control]);

  return (
    <motion.div variants={titleVariants} ref={ref} initial="initial" className={className} animate={control}>
      {children}
    </motion.div>
  );
}

interface NavbarMotionProps extends MotionProps {
  delay?: number;
}

export function LiNavbarMotion({ children, className, delay }: NavbarMotionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    }
  }, [isInView, control]);

  return (
    <motion.li variants={navbar(delay)} ref={ref} initial="initial" className={className} animate={control}>
      {children}
    </motion.li>
  );
}

export function Liservices({ children, className }: MotionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    }
  }, [isInView, control]);

  return (
    <motion.li variants={liServices()} ref={ref} initial="initial" className={className} animate={control}>
      {children}
    </motion.li>
  );
}

interface ImageMotionProps {
  src: string | StaticImageData;
  width: number;
  height: number;
  alt: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  style?: CSSProperties;
}

export function ImageMotion({ src, width, height, alt, quality, placeholder, style }: ImageMotionProps) {
  const control = useAnimation();

  const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
  const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    }
  }, [isInView, control]);

  return (
    <motion.div
      initial={false}
      animate={
        isLoaded && isInView
          ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
          : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
      }
      transition={{ duration: 0.2, delay: 0.1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        quality={quality}
        placeholder={placeholder}
        style={style}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}

export function Rotate({ children, className }: MotionProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    }
  }, [isInView, control]);

  return (
    <motion.p variants={rotate} ref={ref} initial="initial" className={className} animate={control}>
      {children}
    </motion.p>
  );
}

interface CounterProps {
  className?: string;
  target: number;
}

export function Counter({ className, target }: CounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 0.8 });
    }
  }, [isInView]);

  return (
    <motion.p ref={ref} className={className}>
      {rounded}
    </motion.p>
  );
}

export function SectionApper({ children, className }: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("animate");
    }
  }, [isInView, control]);

  return (
    <motion.div variants={liServices()} ref={ref} initial="initial" className={className} animate={control}>
      {children}
    </motion.div>
  );
}
