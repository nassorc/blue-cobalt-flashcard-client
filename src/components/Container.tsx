import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-2 md:container max-w-5xl", className)}>
      {children}
    </div>
  );
}
