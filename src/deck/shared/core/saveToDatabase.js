import { ADD_DECK_ENDPOINT, UPDATE_DECK_ENDPOINT } from '../../../utils/api';
export async function saveToDatabase(deck, deckId='', header) {
    let res={};
    try {
        if(deckId===null || deckId==='') {
            res = await addNewDeck(deck, header);
        }
        else if (deckId) {
            res = await updateDeck(deck, deckId, header);
        }
        return res.ok ? true : false;
    }
    catch(err) {
        throw new Error(err.message);
    }
}

async function updateDeck(deck, deckId, header) {
    try {
        const res = await fetch(UPDATE_DECK_ENDPOINT(deckId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify({details: deck})
        });
        return res;
    }
    catch(err) {
        throw new Error(err.message);
    }
}

async function addNewDeck(deck, header) {
    try {
        const res = await fetch( ADD_DECK_ENDPOINT() , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify({details: deck})
        });
        return res;
    }
    catch(err) {
        throw new Error(err.message);
    }
}