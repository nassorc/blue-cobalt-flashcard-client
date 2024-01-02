import { ReactNode, useState } from "react";

interface T {
  name: string
}

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  onClick?: () => void;
}

export default function FlashcardDeckShell({
  children,
  ...divProps
}: Props) {
  const [deckHover, setDeckHover] = useState(false);
  return (
    <div
      className="
        min-h-[216px] bg-white
        group relative overflow-hidden border border-black/30 rounded-lg 
        transition-shadow"
      onMouseEnter={() => setDeckHover(true)}
      onMouseLeave={() => setDeckHover(false)}
      style={{
        boxShadow: deckHover ? "0px 4px 0px 4px rgba(0, 0, 0, 0.2)" : "",
      }}
      {...divProps}
    >
      {children}
    </div>
  );
}
