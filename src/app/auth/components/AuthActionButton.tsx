import React, { Children } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface TProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
}
function AuthActionButton(props: TProps) {
  const { children, className, ...btnProps } = props;
  return (
    <Button
      type="submit"
      className={cn(
        "w-full py-6 bg-black hover:bg-black/80 text-cyan-200",
        className,
      )}
    >
      {children}
    </Button>
  );
}

export default AuthActionButton;
