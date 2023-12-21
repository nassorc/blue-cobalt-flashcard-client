// Interface for server endpoints
// Authentication endpoints
export const POST_LOGIN_ENDPOINT = () =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/user/login/`;
export const POST_REGISTER_ENDPOINT = () =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/user/register/`;

// Deck and Card endpoints
// export const GET_DECKS_ENDPOINT = () => '/deck/';
export const GET_DECKLIST_ENDPOINT = (userId) =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/deck/${userId}`;
export const GET_DECK_ENDPOINT = (deckId) =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/deck/get/${deckId}`;
export const ADD_DECK_ENDPOINT = () =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/deck`;
export const UPDATE_DECK_ENDPOINT = (deckId) =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/deck/update/${deckId}`;
export const DELETE_DECK_ENDPOINT = (deckId) =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/deck/delete/${deckId}`;

export const GRADE_CARD_ENDPOINT = () =>
  `${import.meta.env.VITE_SERVER_BASE_URL}/deck/cards/grade`;

// GET OPTIONS
const getOpts: RequestInit = {
  method: "GET",
  credentials: "include",
};
let postOpts: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export async function getUserProfile() {
  const res = await fetch("http://localhost:3001/user/me", getOpts);
  return await res.json();
}

export async function listUsers(args: { limit: number; skip: number }) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    query.append(key, value);
  }

  const res = await fetch(
    "http://localhost:3001/user/me?" + query.toString(),
    getOpts,
  );
  return await res.json();
}

export async function validateToken(token: string): Promise<{valid: boolean}> {
  const res = await fetch("http://localhost:3001/user/token/validate", getOpts);
  return await res.json();
}

export async function login(credentials: any) {
  let requestObj = { ...postOpts, body: JSON.stringify(credentials) };
  const res = await fetch("http://localhost:3001/user/login", requestObj);
  if(!res.ok) {
    const code = res.status;
    switch(code) {
      case 400:
        throw new Error("Enter a valid email and password.");
      case 401:
      case 403:
        throw new Error("Invalid email or password");
      case 500:
        throw new Error("Something went wrong. Please try again later");
    }
  }
  return await res.json();
}

export async function logout() {
  await fetch("http://localhost:3001/user/logout", postOpts);
}

export async function register(credentials: any) {
  let requestObj = { ...postOpts, body: JSON.stringify(credentials) };
  return await fetch("http://localhost:3001/user/", requestObj);
}

export async function gradeCard(args: any) {
  const res = await fetch("http://localhost:3000/user/register");
  return await res.json();
}

export async function addCard(args: any) {
  const res = await fetch("http://localhost:3000/user/register");
  return await res.json();
}

export async function deleteCard(args: any) {
  const res = await fetch("http://localhost:3000/user/register");
  return await res.json();
}
