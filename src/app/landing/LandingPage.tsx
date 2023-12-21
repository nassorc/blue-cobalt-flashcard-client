import A from "@/components/LandingSVG";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="container text-center space-y-5 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img src="/quick-lg.png" alt="website-logo" className="relative" />
          <img
            src="/quick-lg.png"
            alt="website-logo"
            className="absolute inset-0 z-40 opacity-0 hover:opacity-30 animate-ping"
          />
        </div>
        <h1 className="text-5xl font-bold leading-snug">
          <span className="text-website-accent">
            Empower your learning with AI:
          </span>
          <br />
          Effortless flashcard creation
        </h1>
      </div>
      <p className="text-lg text-gray-600">
        Building learning materials shouldn't be so tedious | complicated |
      </p>
      <div className="space-x-5">
        <Button size="lg" className="">
          Create account
        </Button>
        <Button size="lg">Log in</Button>
      </div>
      <A />
    </div>
  );
}
