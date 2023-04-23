import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

// import instance of firebase storage
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import InputCard from './InputCard';
import {InputSm} from '../../components/styles/Input.styled'
import Card from './Card';
import { Group } from '../../components/styles/Group.styled';

import { GET_DECK_ENDPOINT, UPDATE_DECK_ENDPOINT, DELETE_DECK_ENDPOINT } from '../../utils/api'

import styles from '../../assets/styles.module.css';



// Log:
//      (1) When changing avatars, delete the old one.
//      (2) Using urls broke the getDominantColor function in /Home/Deck
//      (3) make cards list a scrollable container?
//      (4) Refactor /EditDeck/page too much clutter
//      (5) Add delete deck at the bottom, show popup to confirm operation
//      (6) Show popup to confirm cancel
//      (5-6) create a popup component to confirm process 


// COMPLETE
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

export default function EditDeckPage() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { deckId } = useParams();
    // fetch deck using url param
    const url =  `${process.env.REACT_APP_SERVER_BASE_URL}${GET_DECK_ENDPOINT(deckId)}`;
    const deck = useFetchData(url, {
        headers: {'Authorization': `Bearer ${authContext.auth.token}`}
    });

    // input data
    const [deckName, setDeckName] = useState('')                        // deck name
    const [newCardCount, setNewCardCount] = useState(0);                // number of type 'new' cards added to review session
    const [reviewedCardCount, setReviewedCardCount] = useState(0);      // number of type 'reviewed' cards added to review session
    const [deckImage, setDeckImage] = useState('');                     
    const [deckImageName, setDeckImageName] = useState('');             // deck image name. Used to query image in firebase storage.
    const [deckImageFile, setDeckImageFile] = useState('');             // image upload file
    const [deckImageURL, setDeckImageURL] = useState('');               // deck image. Contains download url produdced by firebase
    const [modifiedCards, setModifiedCards] = useState([]);             // contains the modified card list

    // set intitial value of the fields when fetch returns data
    useEffect(() => {
        setDeckName(deck?.deckName)
        setNewCardCount(deck?.deckSettings?.newCards)
        setReviewedCardCount(deck?.deckSettings?.reviewCards)
        setModifiedCards(deck?.cards);
    }, [deck])

    // creates a list of cards
    let CardList = (modifiedCards)
        ? modifiedCards?.map(card => {
                return <Card id={card._id} front={card.front} back={card.back} setModifiedCards={setModifiedCards} key={card._id} />
            })
        : [];
    
    let DeckImageComponent = (deckImage) ? <img src={deckImage}/> : null

    const handleSaveDeck = async (e) => {
        // if user uploaded an image
        if(deckImageFile) {  // upload to firebase
            // if user has a deck image, delete current one in firebase, and create new download url.
            if(deck?.deckImage && deck?.deckImageName) {
                const deleteImageRef = ref(storage, `decks/${deck?.deckImageName}`);
                try {
                    await deleteObject(deleteImageRef);
                }
                catch(err) {
                    throw new Error(err.message);
                }
            }
            // upload new image to firebase
            const imageRef = ref(storage, `decks/${deckImageName}`);
            await uploadBytes(imageRef, deckImageFile).then((snapshot) => {
                getDownloadURL(imageRef).then(async (url) => {
                    setDeckImageURL(url)

                    // deck saved to database
                    const updatedDeck = {
                        deckName,
                        deckImage: (url) ? url : deck?.deckImage || '',
                        deckImageName: (deckImageName) ? deckImageName : deck?.deckImageName || '',
                        cards: modifiedCards,
                        deckSettings: {
                            reviewCards: reviewedCardCount,
                            newCards: newCardCount
                        }
                    }
                    
                    // request update
                    try {
                        const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${UPDATE_DECK_ENDPOINT(deckId)}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authContext.auth.token}`
                            },
                            body: JSON.stringify({details: updatedDeck})
                        });
                        navigate('/');

                    }
                    catch(err) {
                        throw new Error(err.message);
                    }

                })
            })
        }
    }
    const handleDeleteDeck = async () => {
        // make delete request 
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${DELETE_DECK_ENDPOINT(deckId)}`, {
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
            <Group>
                <div>
                    <h1>Edit Deck</h1>
                    <p>Edit deck and click the save button to save any changes.</p>
                </div>
                <div>
                    <button onClick={handleSaveDeck}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleDeleteDeck}>Delete</button>
                </div>
            </Group>
            

            <Group>
                <div>
                    <div>
                        {
                            (deck?.deckImage)
                            ? <img src={deck?.deckImage} width="10%" alt="deck image"/>
                            : null
                        }
                        {
                            (deckImageURL)
                            ? <img src={deckImageURL} width="10%" alt="deck image"/>
                            : null
                        }
                        
                    </div>
                    <div>
                        <label>Deck Name</label>
                        <input type="text" value={deckName} onChange={(e) => {
                            setDeckName(e.target.value);
                        }}/>
                    </div>
                </div>
                
            </Group>
            <Group>
                <h3>Deck Settings</h3>

            </Group>
            <Group shadow={true}>
                <div>
                    <p>Number of cards added each review session</p>
                    <div><label>new cards:</label> <InputSm type="input" value={newCardCount} onChange={(e) => {
                        setNewCardCount(e.target.value)
                    }}/></div>
                    <div><label>reviewed cards:</label><InputSm type="input" value={reviewedCardCount} onChange={(e) => {
                        setReviewedCardCount(e.target.value)
                    }}/></div>

                    <div>
                        <p>update deck image</p>
                        <input 
                            type="file" accept=".jpg, .jpeg, .png" 
                            id="img-field"
                            onChange={async (e) => {
                                setDeckImageFile(e.target.files[0])
                                const {handleUploadImageEvent} = await import('../../utils/uploadImage')
                                handleUploadImageEvent(e.target.files, setDeckImage, setDeckImageName)
                            }}
                        />
                        <div style={{width: "100px", height: "100px", overflow: "hidden"}}>
                            {DeckImageComponent}
                        </div>
                    </div>
                </div>
                
            </Group>
            <Group><h3>Cards</h3></Group>
            <Group>
                <div>
                    <InputCard  setModifiedCards={setModifiedCards}/>
                    {CardList}
                </div>
            </Group>
        </section>
    )
}