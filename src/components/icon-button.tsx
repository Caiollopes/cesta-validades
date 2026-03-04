import { Button } from "./ui/button";
import React, { type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const iconButtonVariants = cva(
  "border border-white/10 rounded-md p-1.5 px-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted text-primary",
  {
    variants: {
      tone: {
        dark: "bg-black/20 ",
        light: "bg-white/10",
      },
    },
    defaultVariants: {
      tone: "dark",
    },
  },
);

interface iconButtonProps
  extends ComponentProps<"button">, VariantProps<typeof iconButtonVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function IconButton({
  tone,
  children,
  className,
  ...props
}: iconButtonProps) {
  return (
    <>
      <Button {...props} className={iconButtonVariants({ tone, className })}>
        {children}
      </Button>
    </>
  );
}
