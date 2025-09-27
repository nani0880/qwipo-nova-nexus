import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-primary/20 text-primary-foreground border border-primary/30 hover:bg-primary/30 hover:shadow-glow-primary hover:border-primary",
        secondary: "bg-secondary/20 text-secondary-foreground border border-secondary/30 hover:bg-secondary/30 hover:shadow-glow-secondary hover:border-secondary",
        accent: "bg-accent/20 text-accent-foreground border border-accent/30 hover:bg-accent/30 hover:shadow-glow-accent hover:border-accent",
        glass: "glass-card hover:glow-primary text-foreground",
        hero: "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 text-foreground border border-primary/30 hover:shadow-glow-primary hover:scale-105 neon-text",
        ghost: "hover:bg-primary/10 hover:text-primary text-muted-foreground",
        outline: "border border-primary/30 bg-background hover:bg-primary/10 hover:text-primary text-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        hero: "h-14 px-8 py-4 text-lg font-bold"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  asChild?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(neonButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {(variant === "primary" || variant === "secondary" || variant === "accent" || variant === "hero") && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        )}
      </Comp>
    );
  }
);
NeonButton.displayName = "NeonButton";

export { NeonButton, neonButtonVariants };