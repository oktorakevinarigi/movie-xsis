type IDerection = "left" | "right" | "up" | "down";
type IType = "spring" | "tween";

export const fadeIn = (direction: IDerection, type: IType, delay: number, duration: number) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});
