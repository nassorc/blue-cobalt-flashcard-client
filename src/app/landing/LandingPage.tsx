import FlashcardDeck from "@/components/FlashcardDeck";
import { Icons } from "@/components/Icons";
import A from "@/components/LandingSVG";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
  <>
    <div 
      className="container text-center space-y-5 flex flex-col justify-start items-center gap-8 pt-32"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <img src="/quick-lg.png" alt="website-logo" className="relative" />
          <img
            src="/quick-lg.png"
            alt="website-logo"
            className="absolute inset-0 z-40 opacity-0 hover:opacity-30 animate-ping "
          />
        </div>
        <h1 className="text-6xl font-bold leading-snug">
          Effortless flashcard creation
        </h1>
        <span>
          Empower your learning with AI, and let it do the tedious work for you!
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/login">
          <Button size="lg" className="">
            Get Started
          </Button>
        </a>
        <span className="inline-block w-[2px] h-8 bg-slate-800"></span>
        <Button size="icon" className="p-[0.6rem] h-full">
          <a href="https://github.com/nassorc/blue-cobalt-flashcard-server">
            <Icons.github />
          </a>
        </Button>
      </div>
    </div>

    <div className="container flex flex-col items-center mt-[24rem] ">

      <div className="flex max-w-[822px] w-full justify-between items-center flex-row gap-10 mx-auto [&>*]:basis-full mb-32">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Build intelligent flashcard decks</h2>
          <p className="text-slate-600">Customize your learning sessions to focus on flashcards you are struggling in!</p>
        </div>
        <div>
          <FlashcardDeck deck={{
            blurhash: "LKO2:N%2Tw=w]~RBVZRi};RPxuwH",
            deckImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=3628&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            deckName: "Programming I",
            deckImageName: "photo",
            _id: "",
            cards: [{}, {}, {}, {}, {}, {}, {}, {}, {status: "reviewed"}, {status: "reviewed"}, {status: "reviewed"}],
            owner: "noone",
            badges: [],
            taskStatus: "complete"
          }}/>
        </div>
      </div>

      <div className="flex max-w-[822px] w-full justify-between items-center flex-row gap-10 mx-auto [&>*]:basis-full mb-32">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Empower decks with AI</h2>
          <p className="text-slate-600">Let AI assist you, enter text, or a topic, and it will do the rest!</p>
        </div>
        <div>
          <img src="/placeholderai.png"/>
        </div>
      </div>

      {
      // <div className="flex max-w-[822px] w-full justify-between flex-row gap-10 mx-auto [&>*]:basis-full mb-32">
      //   <div className="flex flex-col gap-2">
      //     <h2 className="text-2xl font-semibold">Explore decks made by the community</h2>
      //     <p className="text-slate-600">Share or explore decks made by other memebers</p>
      //   </div>
      //   <div>
      //   </div>
      // </div>
      }
    </div>
  </>
  );
}
