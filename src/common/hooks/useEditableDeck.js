import { useState, useEffect } from 'react';
import { GET_DECK_ENDPOINT } from '../../utils/api'

// hook to fetch and manage deck information
export default function useEditableDeck(shouldFetchDeck=false, deckId='', headers={}) {
    const [editableDeck, setEditableDeck] = useState(() => buildDeck())

    useEffect(() => {
        if(shouldFetchDeck) {
            
            (async function() {
                const fetchedDeck = await fetchDeck(deckId, headers)
                setEditableDeck(prevState => {
                    return {
                        ...prevState,
                        deckName: fetchedDeck?.deckName,
                        newCardCount: fetchedDeck?.deckSettings?.newCards,
                        reviewedCardCount: fetchedDeck?.deckSettings?.reviewCards,
                        modifiedCards: fetchedDeck?.cards,
                        deckImage: fetchedDeck?.deckImage
                    }
                })
            })()
        }
    }, []);
    
    return [editableDeck, setEditableDeck];
}

async function fetchDeck(deckId, headers) {
    const url =  `${process.env.REACT_APP_SERVER_BASE_URL}${GET_DECK_ENDPOINT(deckId)}`;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })
        const data = await res.json()
        return (data?.details) ? data.details : data
    } catch (err) {
        throw new Error(err)
    }
}

function buildDeck(deckName='', newCardCount=0, reviewedCardCount=0, deckImage='', deckImageName='', deckImageFile='', modifiedCards=[]) {
    return new Object({
        deckName,
        newCardCount,
        reviewedCardCount,
        deckImage,
        deckImageName,
        deckImageFile,
        modifiedCards,
    })
}