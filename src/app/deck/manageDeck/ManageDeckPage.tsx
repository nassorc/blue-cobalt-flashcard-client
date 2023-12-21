import Fuse from "fuse.js";
import BackgroundImage from "/website-bg.jpg";
import FlashcardDeck from "@/components/FlashcardDeck";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import FlashcardDeckAddCard from "@/components/FlashcardDeckAddCard";
import { useAtom } from "jotai";
import { decksAtom, userAtom } from "@/lib/store/user";
import Container from "@/components/Container";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [view, setView] = useState(1);

  const deckElements = decks?.map((deck: any) => {
    return <FlashcardDeck key={deck._id} deck={deck} />;
  });


  return (
    <>
    {
      showDialog && (
      <>
    <div 
      className="absolute z-40 inset-0 bg-white/50 backdrop-blur-[4px] transition-all"
      onClick={() => setShowDialog(false)}
    >
        
    </div>
    <div 
      className="
        p-6 
        absolute left-1/2 top-1/3 z-50 
        -translate-x-1/2 -translate-y-1/2
        bg-white rounded-sm 
        border border-zinc-300 shadow-md
      ">
      <div>
        <div className="flex justify-between">
          <h2 className="font-bold">Create Flashcard Deck</h2>
          <Icons.x className="scale-75 cursor-pointer" onClick={() => setShowDialog(false)}/>
        </div>
        <p className="text-[0.96rem] text-slate-600 font-light">
          Create a new flashcard Deck. Click add when you're done.
        </p>
      </div>
      {
      (view === 1) && (
<div className="">
        <label className="flex gap-3 items-center justify-end">
          <div>
            Title
          </div>
          <input type="text" className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm" />
        </label>
        <div>Deck Settings</div>
        <hr className="border-slate-300"/>
        <label className="flex gap-3 items-center justify-end">
          <input type="checkbox"/>
          <div>
            <span>
              Public
            </span>
            <span>
              Anyone can see this deck.
            </span>
          </div>
        </label>
        <label className="flex gap-3 items-center justify-end">
          <input type="checkbox"/>
          <div>
            <span>
              Private
            </span>
            <span>
              Only you can see this deck.
            </span>
          </div>
        </label>

        <label>Practice settings</label>
        <hr className="border-slate-300"/>
        <label className="flex gap-3 items-center justify-end">
          New cards
          <input type="text" className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm" />
        </label>
        <label className="flex gap-3 items-center justify-end">
          Reviewed cards
          <input type="text" className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm" />
        </label>


        {
        // <label>
        //   Let AI assist you with creating auto generating flashcards?
        //   <Input type="checkbox"/>
        // </label>
        // <label>
        //   <textarea />
        // </label>
        // <label>
        //   Let AI assist you with generating an Image? 
        //   <Input type="checkbox"/>
        // </label>
        // <label>
        //   Describe the topic of the deck. 
        //   <Input type="Input"/>
        // </label>
        }
      </div>
      )
      }
      
      <div className="flex gap-2 justify-end">
        <Button className="bg-website-accent bg-cyan-200 hover:bg-cyan-300 text-black">AI Assist</Button>
        <Button >Add</Button>
      </div>
    </div>
      </>

      )
    }
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
          onChange={(e) => {
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
        <FlashcardDeckAddCard onClick={() => {setShowDialog(true)}}/>
        { deckElements }
      </div>
    </Container>
  </>
  );
}
