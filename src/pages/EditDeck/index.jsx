import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

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

function InputCard() {
    return(
        <div>
            <div>
                <label htmlFor='front'>front</label>
                <input type='text'/>
            </div>
            <div>
                <label htmlFor='front'>back</label>
                <input type='text'/>
            </div>
            <div>
                <button>add</button>
            </div>
        </div>
    )
}

function Card() {
    return (
        <div>
            <div>
                <span>Front:</span><span> Definition goes here</span>
            </div>
            
            <div>
                <span>back:</span><span> meaning goes here</span>
            </div>

            <div>
                <button>Delete</button>
                <button>edit</button>
            </div>
        </div>
    )
}


export default function EditDeckPage() {
    const authContext = useContext(AuthContext)
    const { id } = useParams();

    const [cards, setCards] = useState([])

    useEffect(() => {
        // first check local storage
        let decks = JSON.parse(window.localStorage.getItem('decks'));
        let deck = {}
        if(decks.length == 0) {  // if local storage is empty, make request
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deck/${authContext.auth.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authContext.auth.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    deck = data.details.reduce((current, card) => (card._id === id) ? card : current)
                    setCards(deck.cards)
                })
        }
        else {
            deck = decks.reduce((current, card) => (card._id === id) ? card : current)
            setCards(deck.cards)
        }

    }, [])
    return(
        <section className={styles['container']}>
            <h1>Edit Deck</h1>
            <div>
                <InputCard />
                <Card />
            </div>
        </section>
    )
}