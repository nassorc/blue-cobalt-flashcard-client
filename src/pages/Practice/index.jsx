import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Card from './Card';
import useFetchData from '../../hooks/useFetchData';
import updateReviewList from './removeCard';
import styles from '../../assets/styles.module.css';

// log:
// added new data to work with, all tagged as new.
// current objectives are to test if the sort function works.
// need to set the due dates of the cards by reviewing

// log:
//       (2) extract cards from review list
//       (3) depending on user settings (right now using hardcoded values),
//           combined N review cards and N new cards.
//            * why? review customization. They can priortize cards they've seen
//              or they can prioritize exposure to all cards
//            * by defining a list that contains the reviewed card list, we can
//              sort them by due date. So cards that have shorter due dates, meaning
//              they struggle with the card, will be priortize in the list. Allowing
//              users to see flashcards that are considered hard for them.
//        (4) add card image to reviewing process.
//            * prerequisites: must implement way to store images as URLS.
//        (5) Add logic that compiles the review cards and new cards.
//            * User schema should have a settings object field
//            * when user logs in, we query the user settings and set it with context
//            * use context to provide global access to the review process settings.
//        (6) add links to edit and add cards


// Create a sort algorithm that sorts the due dates of the review list cards. 
// randomly inject or introduce cards that are flag as 'new'.
// step 1: get reviewList cards and new cards. new cards are slice depending on the amount of
//         new cards added per review session.
// step 2: before combining the reviewlist and new cards, sort the reviewlist by due date, then
//         slice depending on the amount of review cards added per review session
// step 3: combine review and new
// step 4: if grade is [0|1|2], add to list, 0 closer to the top, 1 at the middle, 2 and the back
// step 5: if grade is [3|4|5], a complete review, removed from the reviewlist

// Use reviewlist to display the cards that needs to be reviewed
// randomly select cards from the new pile
// maybe create a usecontext to

function sortByDueDate(deck) {
    return deck ? deck.sort((a,b) => (new Date(a.dueDate)) - (new Date(b.dueDate))) : [];
}
function createReviewSession(reviewCards, newCards, nReview, nNew) {
    let reviewCardList = sortByDueDate(reviewCards).slice(0, nReview);
    let newCardList = newCards ? newCards.slice(0, nNew) : [];
    return [...reviewCardList, ...newCardList];
}
    /** Grades
     * grade https://www.npmjs.com/package/supermemo:
     * 5: perfect response.                                                   Flawless
     * 4: correct response after a hesitation.                                very Good | Hesitant
     * 3: correct response recalled with serious difficulty.                  Good |Struggled
     * 2: incorrect response; where the correct one seemed easy to recall.    Failed
     * 1: incorrect response; the correct one remembered.                     Incoorect
     * 0: complete blackout.                                                  Blackout
     */
    /** Grading Process
     * [0 | 1 | 2] - won't be considered a complete review. Depending on what difficult the
     *               user picks, the card will be placed in the pile, closer to the front.
     *             - shouldn't update the current reviewlist, but can make a request to update
     *               the fields needed for the algorithm
     * [3 | 4 | 5] - considered a complete review. Card will be removed from the current cards
     *               being reviewed.
     *             - everytime the user reviews a card, the review list is updated. if a card
     *               is considered very easy, then that card, depending on the sort algorithm
     *               will be placed behind cards that the user considers difficult.
     */
function makeGradeCard({auth} = {}) {
    return async (cardId, grade) => {
        // make request to api, send grade and card id
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deck/cards/grade`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({cardId, grade})
            })
            const data = await res.json()
        }
        catch(err) {
            throw new Error(err.message)
        }
        
    }
}
    

export default function PracticePage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const { id } = useParams();
    
    const url =  `${process.env.REACT_APP_SERVER_BASE_URL}/deck/${authContext.auth.userId}`;
    const options = { method: 'GET', headers: {'Authorization': `Bearer ${authContext.auth.token}`}}
    const deckList = useFetchData(url, options)
    
    const [deck, setDeck] = useState();
    const [cards, setCards] = useState([]);

    // grade card function
    const gradeCard = makeGradeCard({ auth: authContext.auth })

    const handleEditClick = (e) => {
		navigate(`/edit/${deck._id}`);
	};
    useEffect(() => {
        const getDeckById = (deckList, id) => {
            if(!deckList) return '';
            return deckList?.reduce((current, elm) => (elm._id === id) ? elm : current);
        }
        // set deck, and extract card data
        let d = getDeckById(deckList, id);
        let reviewCards = d?.cards?.filter(card => card.status === 'reviewed')
        let newCards = d?.cards?.filter(card => card.status === 'new')

        // set state
        setDeck(d);
        setCards(createReviewSession(reviewCards, newCards, 5, 2));
        
    }, [deckList])
    console.log(cards)
    let CardComponents = (cards) 
        ? cards.map(card => {
            return <Card cardDetails={card} gradeCard={gradeCard} handleEditClick={handleEditClick} cards={cards} setCards={setCards} updateReviewList={updateReviewList} key={card._id}/>
        })
        : [];

    return(
        <section className={styles['container']}>
            <h1>{deck?.deckName}</h1>
            {(CardComponents?.length > 0) ? CardComponents[0] : <p>You completed todays review list.</p>}
        </section>
    )
}