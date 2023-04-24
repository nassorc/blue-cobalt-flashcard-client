import { UPDATE_DECK_ENDPOINT } from "../../../utils/api";
export async function saveToDatabase(deck, deckId, header) {
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${UPDATE_DECK_ENDPOINT(deckId)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify({details: deck})
        });
        return res.ok ? true : false;
    }
    catch(err) {
        throw new Error(err.message);
    }
}