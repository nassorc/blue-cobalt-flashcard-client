import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {Badges} from "./Badge"
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import DeleteDeckDialog from "./DeleteDeckDialog";
import FlashcardDeckShell from "./FlashcardDeckShell";

interface Deck {
  _id: string
  deckName: string
  blurhash: string
  deckImage: string
  deckImageName: string
  owner: string
  badges?: number[]
  cards: any[]
}

export default function FlashcardDeck({deck}: {deck: Deck}) {
  const [deckImageLoaded, setDeckImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setDeckImageLoaded(true)
    }
    img.src = deck.deckImage
  })
  const deckImage = deckImageLoaded 
    ? (
      <img 
        className="block w-full h-full object-cover select-none"
        src={deck.deckImage}
        // src="https://images.unsplash.com/photo-1692272809300-6a7af9b2a6e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
        alt={deck.deckImageName}
        loading="lazy"
      />
    ) : (
      <Blurhash
        hash={deck?.blurhash}
        width={"100%"}
        height={"100%"}
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
    )
  return (
    <FlashcardDeckShell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="absolute z-[99] right-0 -top-14 opacity-0 m-2 group-hover:top-0 group-hover:opacity-100 transition-all ease-out" 
            size="icon"
          >
            <Icons.moreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to={"/edit/" + deck._id} className="flex items-center space-x-1">
              <Icons.fileEdit />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DeleteDeckDialog deckName={deck.deckName}>
              <Link to="/" className="flex items-center space-x-1">
                <Icons.trash/>
                <span>Delete</span>
              </Link>
            </DeleteDeckDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="relative w-full max-h-[120px] aspect-video overflow-hidden">
        {deckImage}
        <div className="absolute bottom-0 right-0 px-2 flex items-center space-x-0">
          <Badges.completeSm className="inline-block"/>
          <Badges.powered />
        </div>
      </div>
      <div className="px-5 py-4 bg-white overflow-hidden min-h-[90px] flex flex-col justify-end">
        <h2 className="font-semibold text-lg whitespace-nowrap">{deck.deckName}</h2>
        <div className="flex items-center">
          <div className="text-gray-500 flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1 text-sm">
                    <Icons.layers  className="w-4"/>
                    <span className="font-semibold">
                      {
                        deck?.cards.length
                      }
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  info
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex items-center space-x-1 text-sm">
              <Icons.graduationCap  className="w-5"/>
              <span className="font-semibold">
                {
									deck?.cards?.filter((card) => card.status === "reviewed").length
                }
              </span>
            </div>
          </div>
            <Link 
              to={"/practice/" + deck._id}
              className="block ml-auto"
            >
              <Button 
                size="sm" 
                variant="default"
              >
                Practice
              </Button>

            </Link>
        </div>
      </div>
    </FlashcardDeckShell>
  )
}
