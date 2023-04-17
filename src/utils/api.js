// Interface for server endpoints
// Authentication endpoints
export const POST_LOGIN_ENDPOINT = () => '/login/';
export const POST_REGISTER_ENDPOINT = () => '/register/';

// Deck and Card endpoints
// export const GET_DECKS_ENDPOINT = () => '/deck/';
export const GET_DECKS_ENDPOINT = (id) => `/deck/${id}`;
export const UPDATE_DECK_ENDPOINT = (id) => `/deck/update/${id}`;
export const DELETE_DECK_ENDPOINT = (id) => `/deck/delete/${id}`;

export const GRADE_CARD_ENDPOINT = () => '/deck/cards/grade';
