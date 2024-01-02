import { ChangeEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { decksAtom, userAtom } from "@/lib/store/user";
import Fuse from "fuse.js";

import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import Container from "@/components/Container";
import Dialog from "./Dialog";
import FlashcardDeck from "@/components/FlashcardDeck";
import FlashcardDeckAddCard from "@/components/FlashcardDeckAddCard";
import BackgroundImage from "/website-bg.jpg";
import { useStore } from "jotai";

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  findAllMatches: true,
  threshold: 0.2,
  keys: ["deckName"],
};

export default function ManageDeckPage() {
  const [user] = useAtom(userAtom);
  const [decks] = useAtom(decksAtom);
  const [showDialog, setShowDialog] = useState(false);

  const deckElements = decks?.map((deck: any) => {
    return <FlashcardDeck key={deck._id} deck={deck} />;
  });

  useEffect(() => {
    console.log("MANAGED DECK RERENDERED")
  }, [decks]);
  

  return (
    <>
      <Dialog showDialog={showDialog} setShowDialog={setShowDialog} />
      <Container>
        <div
          className="px-4 py-8 bg-cover bg-center bg-no-repeat text-white rounded-lg"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${BackgroundImage})`,
          }}
        >
          <h1 className="pl-4 text-2xl font-bold border-l-4 border-red-400">
            Flashcard list
          </h1>
          <p className="text-lg">Manage your flashcards or create a new deck</p>
        </div>

        <div className="my-4 ml-auto relative w-80">
          <Input
            // value={query}
            placeholder="filter decks..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e;
              // setQuery(e.target.value);
            }}
          />
          <Icons.search className="mx-3 absolute right-0 top-1/2 -translate-y-1/2" />
        </div>

        <div
          className="mx-auto w-full grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))",
          }}
        >
          <FlashcardDeckAddCard
            onClick={() => {
              setShowDialog(true);
            }}
          />
          {deckElements}
        </div>
      </Container>
    </>
  );
}
