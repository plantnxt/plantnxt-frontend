import { cva } from "class-variance-authority";

export const sizeVariants = cva("", {
  variants: {
    size: {
      small: "h-8 px-3 py-1.5 text-sm",
      medium: "h-10 px-4 py-2 text-base",
      large: "h-12 px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type SizeVariant = "small" | "medium" | "large";
