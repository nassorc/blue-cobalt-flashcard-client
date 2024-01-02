import React, { ReactHTMLElement, useState } from "react";
import FlashcardDeckShell from "./FlashcardDeckShell";
import { Icons } from "./Icons";
import { Link } from "react-router-dom";

export default function FlashcardDeckAddCard(props: { onClick: () => any }) {
  const [open, setOpen] = useState(false);
  const { onClick } = props;
  return (
    <FlashcardDeckShell onClick={onClick}>
      <div className="w-full h-full inline-grid place-items-center bg-white cursor-pointer">
        <Icons.plus size={50} />
      </div>
    </FlashcardDeckShell>
  );
}
