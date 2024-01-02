import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badges } from "./Badge";
import { Blurhash } from "react-blurhash";
import DeleteDeckDialog from "./DeleteDeckDialog";
import FlashcardDeckShell from "./FlashcardDeckShell";
import { useQuery } from "react-query"; 
import { deleteDeck, getTask } from "@/lib/api";
import { queryClient } from "./ContextProvider";
import { cn } from "@/lib/utils";

interface Deck {
  _id: string;
  deckName: string;
  blurhash: string;
  deckImage: string;
  deckImageName: string;
  owner: string;
  badges?: number[];
  cards: any[];
  taskStatus: string
}

function DeckActions({ deckId, deckName, show }: { deckId: string, deckName: string, show: boolean }) {
  const [showActions, setShowActions] = useState(false);

  const handleShowActions = () => {
    setShowActions(!showActions);
  }

  const handleDelete = async () => {
    await deleteDeck(deckId);
  }

  return (
    <div className="relative bg-red-400">
      <Button
        size="icon"
        className="absolute z-[99] right-0 m-2 transition-all ease-out border border-white shadow-lg"
        style={{
          top: show ? 0 : "-3.5rem",
          opacity: show ? 1 : 0,
        }}
        onClick={handleShowActions}
      >
        <Icons.moreHorizontal />
        <div 
          className={
            cn(!showActions && "hidden", 
              "m-1 p-1 absolute z-[100] right-0 top-full bg-white text-black rounded-sm overflow-hidden shadow-lg"
            )
          }
        >
          <div className="px-4 py-[0.35rem] flex items-center gap-1 hover:bg-zinc-300 rounded-sm">
            <Icons.settings />
            <span>Edit</span>
          </div>
          <div 
            className="px-4 py-[0.35rem] flex items-center gap-1 hover:bg-zinc-300 rounded-sm text-red-500"
            onClick={handleDelete}
          >
            <Icons.trash />
            <span>Delete</span>
          </div>
        </div>

      </Button>
    </div>
  )
}

function DeckBadges() {
  return (
    <div className="absolute bottom-0 right-0 px-2 flex items-center space-x-0">
      <Badges.completeSm className="inline-block" />
      <Badges.powered />
    </div>
  );
}

function DeckCoverImage({ deckImage, blurhash, deckImageName }: { deckImage: string, deckImageName: string, blurhash: string }) {
  const [deckImageLoaded, setDeckImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDeckImageLoaded(true);
    };
    img.src = deckImage;
  });

  const deckImageElm = deckImageLoaded ? (
    <img
      className="block w-full h-full object-cover select-none"
      src={deckImage}
      // src="https://images.unsplash.com/photo-1692272809300-6a7af9b2a6e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
      alt={deckImageName}
      loading="lazy"
    />
  ) : blurhash ? (
    <Blurhash
      hash={blurhash}
      width={"100%"}
      height={"100%"}
      resolutionX={32}
      resolutionY={32}
      punch={1}
    />
  ) : (
    <div></div>
  );

  return (
    <>
      {deckImageElm}
    </>
  );
}

function PendingDeck({deckId, isPending, setIsPending}: { deckId: string, isPending: boolean, setIsPending: (...args: any) => void }) {
  const {data} = useQuery("task", () => getTask({deckId}), {
    onSuccess: (data) => {
      if (!data.isPending && data.success) {
        queryClient.invalidateQueries("user");
      }
    },
    refetchInterval: 2000
  })
  return (
    <FlashcardDeckShell>
      <div className="animate-pulse">
      <div className="w-full grid place-items-center max-h-[120px] aspect-video overflow-hidden bg-slate-200">
        { data?.tasks?.at(-1) }
      </div>
      <div className="my-4 m-6">
        <div className="mb-2 w-1/2 h-5 bg-slate-200 rounded-md"></div>
        <div className="flex justify-between">
          <div className="mb-2 w-1/4 h-5 bg-slate-200 rounded-md"></div>
          <div className="mb-2 w-[80px] h-8 bg-slate-200 rounded-md"></div>
        </div>
      </div>
      </div>
    </FlashcardDeckShell>
  )
}


export default function FlashcardDeck({ deck }: { deck: Deck }) {
  const [showActions, setShowActions] = useState(false);
  // const [isPending, setIsPending] = useState(deck.taskProgress);
  const [taskStatus, setTaskStatus] = useState("complete");
  const totalCards = deck.cards.length;
  const reviewedCount = deck.cards
    .filter((card) => card.status === "reviewed")
    .length

  return (
      <>
      { (taskStatus === "complete") ? (
        <FlashcardDeckShell 
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <DeckActions deckName={deck.deckName} deckId={deck._id} show={showActions} />
          <div className="relative w-full max-h-[120px] aspect-video overflow-hidden">
            <DeckCoverImage deckImage={deck.deckImage} deckImageName={deck.deckImageName} blurhash={deck.blurhash} />
            <DeckBadges />
          </div>
          <div className="px-5 py-4 bg-white overflow-hidden min-h-[90px] flex flex-col justify-end">
            <h2 className="font-semibold text-lg whitespace-nowrap">
              {deck.deckName}
            </h2>
            <div className="flex items-center">
              <div className="text-gray-500 flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-1 text-sm">
                        <Icons.layers className="w-4" />
                        <span className="font-semibold">{ totalCards }</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>info</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center space-x-1 text-sm">
                  <Icons.graduationCap className="w-5" />
                  <span className="font-semibold">
                    { reviewedCount }
                  </span>
                </div>
              </div>
              <Link to={"/practice/" + deck._id} className="block ml-auto">
                <Button size="sm" variant="default">
                  Practice
                </Button>
              </Link>
            </div>
          </div>
        </FlashcardDeckShell>
        ) : ( 
          <PendingDeck deckId={deck._id} isPending={taskStatus !== "complete"} setIsPending={setTaskStatus}/>
        )
    }
    </>
  );
}
