import { useState, useReducer, useEffect } from 'react';
import { GET_DECK_ENDPOINT } from '../../utils/api'

const ACTIONS = {
    SET_DECK: 'set_deck',
    UPDATE_DECK: 'update_deck',
    ADD_CARD: 'add_card',
    ADD_CARDS: 'add_cards',
    UPDATE_CARD: 'update_card',
    DELETE_CARD: 'delete_card',
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.SET_DECK:
            return {...state, ...buildDeck(action?.payload)}
        case ACTIONS.UPDATE_DECK:
            return {...state, ...action?.payload}
        case ACTIONS.ADD_CARD:
            return {...state, modifiedCards: [action?.payload?.updatedCard, ...state?.modifiedCards]}
        case ACTIONS.ADD_CARDS:
            // console.log("payload", action?.payload?.newCards)
            // return state
            return {...state, modifiedCards: [...action?.payload.newCards, ...state?.modifiedCards]}
        case ACTIONS.UPDATE_CARD:
            let card = state?.modifiedCards?.reduce((current, elm) => (elm._id === action.payload.deckId) ? elm : current);
            let temp = {...card, ...action.payload.updatedCard}
            let filteredCardlist = state?.modifiedCards?.filter((card) => card._id !== action.payload.cardId)
            return {...state, modifiedCards: [temp, ...filteredCardlist]}
        case ACTIONS.DELETE_CARD:
            let updated = state?.modifiedCards?.filter((card) => card._id !== action.payload.cardId)
            return {...state, modifiedCards: updated}
        default:
            return state;
    }
}

// hook to fetch and manage deck information
export default function useEditableDeck(shouldFetchDeck=false, deckId='', headers={}) {
    const [editableDeck, dispatch] = useReducer(reducer, {});
    const [originalDeck, setOriginalDeck] = useState({});

    useEffect(() => {
        if(!shouldFetchDeck) {
            dispatch({ type: ACTIONS.SET_DECK, payload: buildDeck()});
        }
        else {
            (async function() {
                const fetchedDeck = await fetchDeck(deckId, headers)
                let data = {
                    deckName: fetchedDeck?.deckName,
                    newCardCount: fetchedDeck?.deckSettings?.newCards,
                    reviewedCardCount: fetchedDeck?.deckSettings?.reviewCards,
                    modifiedCards: fetchedDeck?.cards,
                    deckImage: fetchedDeck?.deckImage,
                    deckImageName: fetchedDeck?.deckImageName,
                    visibility: fetchDeck?.deckSettings?.visibility,
                }
                dispatch({ type: ACTIONS.SET_DECK, payload: data})
                setOriginalDeck(buildDeck(data));
            })()
        }
    }, [])
    
    return [editableDeck, originalDeck, dispatch, ACTIONS];
}

async function fetchDeck(deckId, headers) {
    try {
        const res = await fetch(GET_DECK_ENDPOINT(deckId), {
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

function buildDeck({deckName='', newCardCount=0, reviewedCardCount=0, deckImage='', deckImageName='', deckImageFile='', modifiedCards=[], visibility=''} = {}) {
    return new Object({
        deckName,
        newCardCount,
        reviewedCardCount,
        deckImage,
        deckImageName,
        deckImageFile,
        modifiedCards,
        visibility,
    })
}