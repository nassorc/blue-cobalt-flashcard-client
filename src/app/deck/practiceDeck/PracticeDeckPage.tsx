import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { useAtom } from "jotai";
import { decksAtom } from "@/lib/store/user";
import { cn } from "@/lib/utils";
import { gradeCard } from "@/lib/api";

function FlashCard({ card }: { card: any }) {
  let cardBgColor: string = "";
  if (card.status === "new") {
    cardBgColor = "bg-red-300";
  } else if (card.status === "learning") {
    cardBgColor = "bg-blue-300";
  } else if (card.status === "completed") {
    cardBgColor = "bg-green-300";
  } else {
    cardBgColor = "bg-white";
  }

  return (
    <div className={cn("flex justify-center mb-16")}>
      <div className="w-[390px] h-[280px] bg-white shadow-lg rounded-md overflow-hidden">
        <div>{card.front}</div>
        <div>{card.back}</div>
      </div>
    </div>
  );
}

export default function PracticeDeckPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decks] = useAtom(decksAtom);
  const [deck, setDeck] = useState(decks?.find((d) => d._id === id));
  const [cards, setCards] = useState(deck?.cards);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progressCompleteWidth, setProgressCompleteWidth] = useState(1);
  const [cardIdx, setCardIdx] = useState(0);

  useEffect(() => {
    if (progressRef !== null && progressRef.current !== null) {
      setProgressCompleteWidth(
        (1 / deck.cards.length) *
          progressRef.current.getBoundingClientRect().width,
      );
    }
  }, []);

  useEffect(() => {}, [progressCompleteWidth]);

  const makeGradeFn = (grade: number) => {
    return async function (cardId: string, deckId: string) {
      await gradeCard({ cardId, deckId, grade });
    };
  };

  console.log(cards);

  return (
    <Container>
      <div className="flex items-center gap-4 mb-16">
        <div className="w-24 h-16 bg-[slateblue] overflow-hidden flex justify-center items-center rounded-md">
          <img src={deck.deckImage} alt="" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Programming I</h1>
          <div>
            <span>{deck?.cards?.length}</span>
            <span> </span>
            <span>cards</span>
            <span> </span>
            <span
              ref={progressRef}
              className="inline-block w-28 h-3 bg-gray-400 rounded-lg"
            >
              <div
                className={cn(
                  "absolute inline-block h-3 bg-green-400 rounded-lg",
                )}
                style={{
                  width: `${progressCompleteWidth}px`,
                }}
              ></div>
            </span>
            <img src="/complete-badge.png" className="inline scale-75" />
          </div>
        </div>
        <Link to={`/edit/${deck._id}`} className="ml-auto">
          <Button>
            <Icons.settings />
            edit
          </Button>
        </Link>
      </div>

      <div className="flex justify-evenly gap-2 mb-16">
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
          <div>new</div>
          <div>
            {deck.cards.filter((card: any) => card.status === "new").length}
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 rounded-full bg-sky-400"></div>
          <div>learning</div>
          <div>
            {
              deck.cards.filter((card: any) => card.status === "learning")
                .length
            }
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
          <div>mastered</div>
          <div>
            {
              deck.cards.filter((card: any) => card.status === "mastered")
                .length
            }
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center mb-16">
        <div className="w-[390px] h-[280px] bg-white">
          <div>{deck.cards[cardIdx].front}</div>
          <div>{deck.cards[cardIdx].back}</div>
        </div>
      </div> */}
      {cards.length > 0 ? (
        <FlashCard card={cards[0]} />
      ) : (
        <div>completed todays review</div>
      )}

      <div className="flex gap-5 justify-center mb-16">
        {cards.map((card: any, idx: number) => (
          <span
            key={idx}
            className="inline-block w-2 h-2 rounded-full bg-gray-500"
          ></span>
        ))}
      </div>

      <div className="flex gap-5 justify-center mb-16"></div>

      <div className="flex flex-col gap-5 items-center mb-16">
        <div>
          <Button size="icon" className="bg-amber-200 text-black">
            <Icons.eyeOff />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              // await gradeCard({
              //   deckId: deck._id,
              //   cardId: deck.cards[0]._id,
              //   grade: 0,
              // });
              let temp: any[] = cards.slice();
              temp.shift();
              setCards(temp);
            }}
          >
            easy
          </Button>
          <Button
            onClick={async () => {
              // await gradeCard({
              //   deckId: deck._id,
              //   cardId: deck.cards[0]._id,
              //   grade: 1,
              // });
              let temp: any[] = cards.slice();
              temp.shift();
              setCards(temp);
            }}
          >
            good
          </Button>
          <Button
            onClick={async () => {
              // await gradeCard({
              //   deckId: deck._id,
              //   cardId: deck.cards[0]._id,
              //   grade: 2,
              // });
              let temp: any[] = cards.slice();
              let card: any;
              card = temp.shift();
              setCards([...temp, card]);
            }}
          >
            hard
          </Button>
          <Button
            onClick={async () => {
              // await gradeCard({
              //   deckId: deck._id,
              //   cardId: deck.cards[cardIdx]._id,
              //   grade: 5,
              // });
              let temp: any[] = cards.slice();
              let card: any;
              card = temp.shift();
              setCards([...temp.slice(0, 1), card, ...temp.slice(1)]);
            }}
          >
            again
          </Button>
        </div>
      </div>
    </Container>
  );
}
