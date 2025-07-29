import * as React from "react";
import { cn } from "@/lib/utils";

export interface MicrochipProps extends React.HTMLAttributes<HTMLDivElement> {
  darkness?: number; // 0 (no darkening) to 1 (fully black)
}

export function Microchip({
  className,
  darkness = 0,
  children,
  ...props
}: MicrochipProps) {
  return (
    <div
    style={{
      backgroundColor: "#001b12",
      border: "1.5px solid #223f22",
   
    }}
      className={cn(
        "relative rounded-lg shadow-lg overflow-hidden p-1",
        className
      )}
      {...props}
    >
      <div
      style={{
        backgroundSize: "70%",
      }}
        className={cn(
          "p-4 rounded-lg w-full h-full bg-[url('https://i.pinimg.com/736x/03/c4/1e/03c41e500d764f1fc840daf130f00512.jpg')] bg-center relative overflow-hidden"
        )}
      >
        {/* Overlay for darkness */}
        {darkness > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-0 rounded-lg"
            style={{ background: `rgba(0,0,0,${darkness})` }}
          />
        )}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
