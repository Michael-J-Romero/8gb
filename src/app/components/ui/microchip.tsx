import * as React from "react";
import { cn } from "@/lib/utils";

export interface MicrochipProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Microchip({ className, ...props }: MicrochipProps) {
  return (
    <div
      className={cn(
        " overflow-hidden",
        "bg-[url('https://i.pinimg.com/736x/03/c4/1e/03c41e500d764f1fc840daf130f00512.jpg')] bg-cover bg-center",
        className
      )}
      {...props}
    />
  );
}
