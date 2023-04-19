import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { GET_DECKS_ENDPOINT, UPDATE_DECK_ENDPOINT, DELETE_DECK_ENDPOINT } from '../../utils/api'

import styles from '../../assets/styles.module.css';

// Log:
// Todo: (1) cardlist
//           (*) can edit individual field of card
//               front: definition  edit button
//               back: meaning      edit button
//               button delete
//           (*) add card skeleton, add a new card to the deck
//               Will always be at the top of the cardlist
//               front: input
//               back: input
//               button save
//       (2) Can edit cards details, switch components with state
//       (3) delete deck button
//       (4) can adjust total new and review cards added at each
//           study session
//       (5) save button at the bottom. 
//       (6) notify user of the update

function InputCard({ setModifiedCards }) {    
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleAdd = (e) => {
        console.log('clicking')
        const newCard = {
            front,
            back,
        }
        setModifiedCards(prevState => {
            return [newCard,...prevState]
        })
        setFront('')
        setBack('')
    }
    return(
        <div>
            <div>
                <label htmlFor='front'>front</label>
                <input type='text' value={front} onChange={(e) => {
                    setFront(e.target.value);
                }}/>
            </div>
            <div>
                <label htmlFor='back'>back</label>
                <input type='text' value={back} onChange={(e) => {
                    setBack(e.target.value);
                }}/>
            </div>
            <div>
                <button onClick={handleAdd}>add</button>
            </div>
        </div>
    )
}

function Card({id, front, back, setModifiedCards}) {
    const [isEdit, setIsEdit] = useState(false);
    const [frontField, setFrontField] = useState(front.slice());
    const [backField, setBackField] = useState(back.slice());
    const handleDelete = (e) => {
        setModifiedCards(prevState => {
            let updated = prevState.filter((card) => card._id !== id)
            return [...updated]
        })
    }
    const handleEdit = (e) => {
        setFrontField(front)
        setBackField(back)
        setIsEdit(!isEdit)
    }
    const handleUpdate = (e) => {
        setModifiedCards(prevState => {

            let card = prevState.reduce((current, elm) => (elm._id === id) ? elm : current);
            let temp = {...card}
            temp.front = frontField;
            temp.back = backField;

            return [temp, ...prevState.filter((card) => card._id !== id)]
        })
        setIsEdit(!isEdit)
    }
    const handleCancel = (e) => {
        setIsEdit(!isEdit)

    }
    let cardComponent = (!isEdit) ? 
            <div>
                <div>
                    <span>Front:</span><span> {front}</span>
                </div>
                
                <div>
                    <span>back:</span><span> {back}</span>
                </div>

                <div>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>edit</button>
                </div>
            </div>
            :
            <div>
                <label>front:</label>
                <input value={frontField} onChange={(e) => {setFrontField(e.target.value)}}/>
                <br />
                <label>back:</label>
                <input value={backField} onChange={(e) => {setBackField(e.target.value)}}/>
                <div>
                    <button onClick={handleUpdate}>update</button>
                    <button onClick={handleCancel}>cancel</button>
                </div>
            </div>
    return (
        <div>
            {cardComponent}
        </div>
    )
}

export default function EditDeckPage() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { id } = useParams();

    const url =  `${process.env.REACT_APP_SERVER_BASE_URL}${GET_DECKS_ENDPOINT(authContext.auth.userId)}`;
    const options = { method: 'GET', headers: {'Authorization': `Bearer ${authContext.auth.token}`}}
    const deck = useFetchData(url, options)?.reduce((current, elm) => (elm._id === id) ? elm : current);
    const [cards, setCards] = useState([]);
    const [modifiedCards, setModifiedCards] = useState([]);

    // input fields
    const [deckName, setDeckName] = useState('')
    const [newCardCount, setNewCardCount] = useState(0);
    const [reviewedCardCount, setReviewedCardCount] = useState(0);
    const [deckImage, setDeckImage] = useState('');

    useEffect(() => {
        setDeckName(deck?.deckName)
        setNewCardCount(deck?.deckSettings?.newCards)
        setReviewedCardCount(deck?.deckSettings?.reviewCards)
        setCards(deck?.cards);
        setModifiedCards(deck?.cards);
    }, [deck])

    let CardList = (modifiedCards)
        ? modifiedCards?.map(card => {
                return <Card id={card._id} front={card.front} back={card.back} setModifiedCards={setModifiedCards} key={card._id} />
            })
        : [];

    let DeckImageComponent = (deckImage) ? <img src={deckImage}/> : null

    const handleSaveDeck = async (e) => {
        const updatedDeck = {
            deckName,
            deckImage: (deckImage) ? deckImage : deck?.deckImage,
            cards: modifiedCards,
            deckSettings: {
                reviewCards: reviewedCardCount,
                newCards: newCardCount
            }
        }
        const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${UPDATE_DECK_ENDPOINT(id)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext.auth.token}`
            },
            body: JSON.stringify({details: updatedDeck})
        });
        const data = await res.json();
        navigate('/');
    }
    const handleDeleteDeck = async () => {
        // make delete request 
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${DELETE_DECK_ENDPOINT(id)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext.auth.token}`,
            }
        })
        navigate('/');
    }
    const handleCancel = () => {
        navigate('/');
    }
    return(
        <section className={styles['container']}>
            <h1>Edit Deck</h1>
            <button onClick={handleSaveDeck}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleDeleteDeck}>Delete</button>
            <div>
                <div>
                    {
                        (deck?.deckImage)
                        ? <img src={deck?.deckImage} alt="deck image"/>
                        : ""
                    }
                    
                </div>
                <div>
                    <label>Deck Name</label>
                    <input type="text" value={deckName} onChange={(e) => {
                        setDeckName(e.target.value);
                    }}/>
                </div>
            </div>
            <p>Review settings</p>
            <div>
                <p>Number of cards added each review session</p>
                <div><label>new cards:</label> <input type="input" value={newCardCount} onChange={(e) => {
                    setNewCardCount(e.target.value)
                }}/></div>
                <div><label>reviewed cards:</label><input type="input" value={reviewedCardCount} onChange={(e) => {
                    setReviewedCardCount(e.target.value)
                }}/></div>
            </div>
            <div>
                <p>update deck image</p>
                <input 
                    type="file" accept=".jpg, .jpeg, .png" 
                    id="img-field"
                    onChange={async (e) => {
                        const {handleUploadImageEvent} = await import('../../utils/uploadImage')
                        handleUploadImageEvent(e.target.files, setDeckImage)
                    }}
                />
                <div style={{width: "200px", height: "200px", overflow: "hidden"}}>
                    {DeckImageComponent}
                </div>
            </div>
            <div>
                <InputCard  setModifiedCards={setModifiedCards}/>
                {CardList}
            </div>
        </section>
    )
}