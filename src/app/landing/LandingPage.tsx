import FlashcardDeck from "@/components/FlashcardDeck";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      <div className="relative z-50 text-center space-y-5 flex flex-col justify-start items-center gap-8 px-8 py-24 md:py-60 overlfow-hidden">
        <div className="flex flex-col lg:items-center gap-4">
          <h1 className="text-4xl lg:text-5xl md:text-start font-bold leading-snug">
            Effortless flashcard creation
          </h1>
          <span className="lg:text-lg">
            Empower your learning with AI, and let it do the tedious work for
            you!
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login">
            <Button size="lg" className="overflow-hidden bg-black">
              Get Started
            </Button>
          </a>
          <span className="inline-block w-[2px] h-8 bg-slate-800"></span>
          <Button
            size="icon"
            className="p-[0.6rem] h-full overflow-hidden bg-black"
          >
            <a href="https://github.com/nassorc/blue-cobalt-flashcard-server">
              <Icons.github />
            </a>
          </Button>
        </div>
        <div className="absolute z-[-1] overflow-hidden inset-0">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 md:top-0 right-1/3 lg:right-1/2 w-[600px] h-[600px] blur-3xl"
          >
            <path
              fill="#A7F0BA"
              d="M44.2,-52.6C52.9,-45.4,52.6,-27.3,57.6,-8.7C62.6,9.9,72.9,28.9,67.5,39.5C62,50.1,40.9,52.1,22.5,56.5C4.1,60.9,-11.5,67.8,-25.4,64.9C-39.3,62,-51.5,49.4,-59.2,34.8C-66.9,20.2,-70.1,3.6,-65.1,-9.1C-60,-21.8,-46.6,-30.8,-34.4,-37.4C-22.2,-44,-11.1,-48.3,3.3,-52.2C17.7,-56.2,35.5,-59.8,44.2,-52.6Z"
              transform="translate(100 100)"
            />
          </svg>

          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 left-1/3 w-[600px] h-[600px] blur-3xl md:w-[800px] md:h-[800px] lg:w-[1200px] lg:h-[1200px] "
          >
            <path
              fill="#a5b4fc"
              d="M40.9,-16.9C48.5,10.2,47.1,36.5,35.7,43.6C24.2,50.6,2.7,38.3,-19.6,23C-41.8,7.8,-64.7,-10.4,-61.6,-31.3C-58.5,-52.2,-29.2,-75.8,-6.3,-73.8C16.6,-71.7,33.3,-44,40.9,-16.9Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <div className="container flex flex-col items-center mt-28">
        <div className="flex max-w-[822px] w-full flex-col md:flex-row justify-between items-center gap-10 mx-auto [&>*]:basis-full mb-32">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              Build intelligent flashcard decks
            </h2>
            <p className="text-slate-600">
              Customize your learning sessions to focus on flashcards you are
              struggling in!
            </p>
          </div>
          <div>
            <img src="/flashcard.png" />
          </div>
        </div>

        <div className="flex max-w-[822px] w-full flex-col md:flex-row justify-between items-center gap-10 mx-auto [&>*]:basis-full mb-32">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              Empower your flashcard decks with AI
            </h2>
            <p className="text-slate-600">
              Let AI assist you. Enter text or a topic, and it will do the rest!
            </p>
          </div>
          <div>
            <img src="/mascot-transparent.png" />
          </div>
        </div>
      </div>
    </>
  );
}
