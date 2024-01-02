import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";
import useFetchData from "../../../lib/hooks/useFetchData";
import createReviewSession from "../shared/utils/createReviewSession";
import filterDeckById from "../../../lib/filterDeckById";
import { GET_DECKLIST_ENDPOINT, GRADE_CARD_ENDPOINT } from "../../../lib/api";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

// log:
// Edit component pages contains better code to fetch deck data

// TODO:
//        (4) add card image to reviewing process.
//            * prerequisites: must implement way to store images as URLS.
// COMPLETE ===========================================================================
//       (2) extract cards from review list
//       (3) depending on user settings (right now using hardcoded values),
//           combined N review cards and N new cards.
//            * why? review customization. They can priortize cards they've seen
//              or they can prioritize exposure to all cards
//            * by defining a list that contains the reviewed card list, we can
//              sort them by due date. So cards that have shorter due dates, meaning
//              they struggle with the card, will be priortize in the list. Allowing
//              users to see flashcards that are considered hard for them.
//        (5) Add logic that compiles the review cards and new cards.
//            * User schema should have a settings object field
//            * when user logs in, we query the user settings and set it with context
//            * use context to provide global access to the review process settings.
//        (6) add links to edit and add cards
//        (7) use user settings from database

// sorting
//          Create a sort algorithm that sorts the due dates of the review list cards.
//          randomly inject or introduce cards that are flagged as 'new'.
//          step 1: get reviewList cards and new cards. new cards are slice depending on the amount of
//                  new cards added per review session.
//          step 2: before combining the reviewlist and new cards, sort the reviewlist by due date, then
//                  slice depending on the amount of review cards added per review session
//          step 3: combine review and new
//          Grading:
//          step 4: if grade is [0|1|2], add to list, 0 closer to the top, 1 at the middle, 2 and the back
//          step 5: if grade is [3|4|5], a complete review, removed from the reviewlist

//          Use reviewlist to display the cards that needs to be reviewed
//          randomly select cards from the new pile
//          maybe create a usecontext to
//

// function

export default function PracticeDeckPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Container>

      <div className="flex items-center gap-4 mb-16">
        <div className="w-24 h-16 bg-[slateblue]"></div>
        <div>
          <h1 className="text-lg font-semibold">
            Programming I
          </h1>
          <div>
            <span>50</span>
            <span> </span>
            <span>cards</span>
            <span> </span>
            <span className="inline-block w-28 h-3 bg-gray-400 rounded-lg">
              <span className="absolute inline-block w-16 h-3 bg-green-400 rounded-lg"></span>
            </span>
            <img src="/complete-badge.png" className="inline scale-75"/>
          </div>
        </div>
        <Button className="ml-auto">
          <Icons.settings />
          edit
        </Button>
      </div>

      <div className="flex justify-evenly gap-2 mb-16">
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
          <div>new</div>
          <div>5</div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 rounded-full bg-sky-400"></div>
          <div>reviewing</div>
          <div>10</div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
          <div>mastered</div>
          <div>2</div>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <div className="w-[390px] h-[280px] bg-white">
          card
        </div>
      </div>

      <div className="flex gap-5 justify-center mb-16">
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
      </div>

      <div className="flex gap-5 justify-center mb-16">
      </div>

      <div className="flex flex-col gap-5 items-center mb-16">
        <div>
          <Button size="icon" className="bg-amber-200 text-black"><Icons.eyeOff /></Button>
        </div>
        <div className="flex gap-2">
          <Button>easy</Button>
          <Button>good</Button>
          <Button>hard</Button>
          <Button>again</Button>
        </div>
      </div>
      
    </Container>
  );
}
