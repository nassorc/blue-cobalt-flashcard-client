// Interface for server endpoints
// Authentication endpoints
export const POST_LOGIN_ENDPOINT = () => '/login/';
export const POST_REGISTER_ENDPOINT = () => '/register/';

// Deck and Card endpoints
// export const GET_DECKS_ENDPOINT = () => '/deck/';
export const GET_DECKS_ENDPOINT = (userId) => `/deck/${userId}`;
export const GET_DECK_ENDPOINT = (deckId) => `/deck/get/${deckId}`
export const UPDATE_DECK_ENDPOINT = (deckId) => `/deck/update/${deckId}`;
export const DELETE_DECK_ENDPOINT = (deckId) => `/deck/delete/${deckId}`;

export const GRADE_CARD_ENDPOINT = () => '/deck/cards/grade';
