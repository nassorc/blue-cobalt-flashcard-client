import { DELETE_DECK_ENDPOINT } from "../../../../lib/api";
export async function deleteDeck(deckId, header) {
  try {
    const res = await fetch(DELETE_DECK_ENDPOINT(deckId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
    });
    return res.ok;
  } catch (err) {
    throw new Error(err.message);
  }
}
