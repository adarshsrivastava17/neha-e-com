import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-nude bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
