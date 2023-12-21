import { HTMLProps } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLProps<HTMLDivElement> {}
function PoweredBadge(props: BadgeProps) {
  const {className, ...divProps} = props;
  return(
    <div className={cn("relative m-2 w-5", className)} >
      <img className="absolute z-40 animate-ping scale-50" src="/quick.png" alt="" />
      <img className="relative z-50" src="/quick.png" alt=""/>
    </div>
  )
}
function CompletedBadge(props: BadgeProps) {
  const {className, ...divProps} = props;
  return(
    <div className={cn("block w-6", className)}>
      <img src="/complete-badge.png" alt="" />
    </div>
  )
}
export const Badges = {
  completeSm: CompletedBadge,
  powered: PoweredBadge
}
