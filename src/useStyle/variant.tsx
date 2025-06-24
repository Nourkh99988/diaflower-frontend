import { Variants } from "framer-motion";

export const titleVariants: Variants = {
  initial: { y: 15, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const navbar = (delay: number = 0): Variants => {
  return {
    initial: { y: "-100%" },
    animate: {
      y: 0,
      // style: { position: "initial" },
      transition: {
        duration: 2.2,
        delay,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };
};

export const order = (delay: number = 0): Variants => {
  return {
    initial: { x: "-25vw" },
    animate: {
      x: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: "easeInOut",
        type: "spring",
        stiffness: 200,
      },
    },
  };
};

export const liServices = (delay: number = 0): Variants => {
  return {
    initial: { y: 25, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay,
        ease: "easeInOut",
      },
    },
  };
};

export const rotate: Variants = {
  initial: {
    scale: [1],
    rotate: [0],
  },
  animate: {
    scale: [1, 2, 2, 1, 1],
    rotate: [0, -180, 180, 180, 0],
    borderRadius: ["50%", "10%", "50%", "10%", "50%"],
    x: "50%",
    y: "-50%",
  },
  transition: {
    // duration: 0.4,
    // delay: 0,
    // ease: "easeInOut",
  },
};
