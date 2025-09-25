"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "./utils.js";

function Progress({ className, value = 50, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-800 shadow-inner", // dark futuristic track
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full origin-left transition-transform 
                   bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                   shadow-[0_0_12px_rgba(0,255,255,0.7),0_0_20px_rgba(0,0,255,0.6)]"
        style={{ transform: `scaleX(${value / 100})` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
