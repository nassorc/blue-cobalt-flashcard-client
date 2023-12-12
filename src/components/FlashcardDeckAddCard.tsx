import React from "react";
import FlashcardDeckShell from "./FlashcardDeckShell";
import { Icons } from "./Icons";
import { Link } from "react-router-dom";

export default function FlashcardDeckAddCard() {
  return (
    <FlashcardDeckShell>
      <Link
        to="/add"
        className="w-full h-full inline-grid place-items-center bg-white"
      >
        <Icons.plus size={50} />
      </Link>
    </FlashcardDeckShell>
  );
}
