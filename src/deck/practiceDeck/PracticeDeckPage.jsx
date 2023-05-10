import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";
import useFetchData from "../../shared/hooks/useFetchData";
import createReviewSession from "../shared/utils/createReviewSession";
import filterDeckById from "../../utils/filterDeckById";
import { GET_DECKLIST_ENDPOINT, GRADE_CARD_ENDPOINT } from "../../utils/api";

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

import { PageContainer } from "../../shared/styled/Container.styled";
import { FlashcardContainer } from "../../shared/styled/Flashcard.styled";
import styled from "styled-components";

const PracticeContainer = styled.div`
  margininline: auto;
  margintop: 2rem;
`;

export default function PracticeDeckPage() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { id } = useParams();

    const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${authContext.auth.token}` },
    };
    const deckList = useFetchData(
        GET_DECKLIST_ENDPOINT(authContext.auth.userId),
        options
    );

    const [deck, setDeck] = useState();
    const [cards, setCards] = useState([]);
    const [totalPracticeCards, setTotalPracticeCards] = useState(0);

    useEffect(() => {
        // set deck and extract new and reviewed cards
        let d = filterDeckById(deckList, id);
        let reviewCards = d?.cards?.filter((card) => card.status === "reviewed");
        let newCards = d?.cards?.filter((card) => card.status === "new");
        // set state
        let rCount = d?.deckSettings?.reviewCards || 10;
        let nCount = d?.deckSettings?.newCards || 5;
        setDeck(d);
        let session = createReviewSession(reviewCards, newCards, rCount, nCount);
        setCards(session);
        setTotalPracticeCards(session?.length);
    }, [deckList]);

    const gradeCard = async (cardId, grade) => {
        // make request to api, send grade and card id
        try {
            const res = await fetch(GRADE_CARD_ENDPOINT(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authContext.auth.token}`,
                },
                body: JSON.stringify({ cardId, grade }),
            });
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const handleEditClick = (e) => {
        navigate(`/edit/${deck._id}`);
    };

    // flashcard components
    let CardComponents = cards
        ? cards.map((card) => {
            return (
                <Card
                    cardDetails={card}
                    gradeCard={gradeCard}
                    handleEditClick={handleEditClick}
                    cards={cards}
                    setCards={setCards}
                    key={card._id}
                />
            );
        })
        : [];

    return (
        <PageContainer>
            <div className="relative mx-auto mb-32 w-full h-32 cursor-auto text-white rounded-lg overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.1)]"></div>
                <div className="w-full h-full overflow-hidden">
                    <img
                        src={deck?.deckImage}
                        className="block w-full h-full object-cover"
                    />
                </div>
                <div className="absolute left-0 top-0 mx-6 my-10 w-fit h-fit flex gap-4 flex flex-col">
                    <div className="flex [&>*]:mr-4">
                        {" "}
                        <p className="font-bold text-2xl">{deck?.deckName}</p>
                        <button
                            onClick={handleEditClick}
                            className="px-3 py-1 border-[1px] border-black/80 rounded-md bg-white text-black"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="text-xl">
                        <span className="uppercase">Reviewed: </span>
                        <span className="text-green-400">
                            {totalPracticeCards - cards?.length}
                        </span>
                        <span> / </span>
                        <span>{totalPracticeCards}</span>
                    </div>
                </div>
            </div>
            <div className="relative mx-auto max-w-[680px]">
                {CardComponents?.length > 0 ? (
                    CardComponents[0]
                ) : (
                    <div
                        className="p-4 absolute w-full h-fit flex flex-col items-center justify-between bg-slate-200 rounded-lg border border-sm border-slate-400"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <p className="mb-2">You completed todays review list.</p>
                        <button
                            onClick={() => {
                                navigate("/");
                            }}
                            className="mb-2 w-60 px-3 py-1 border-[1px] border-black/80 rounded-md bg-white "
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={(e) => {
                                window.location.reload(false);
                            }}
                            className="w-60 px-3 py-1 border-[1px] border-black/80 rounded-md bg-white"
                        >
                            Review Again
                        </button>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
