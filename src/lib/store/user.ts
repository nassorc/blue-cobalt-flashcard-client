import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

type T = {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  decks: any[];
};

let initUser: Partial<T> | null = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : {};

let initAccessToken = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken") || "")
  : "";

export const userAtom = atomWithStorage("user", initUser);
export const accessTokenAtom = atomWithStorage("accessToken", initAccessToken);

export const decksAtom = atom(
  (get) => get(userAtom)?.decks,
  (get, set, update: Pick<T, "decks">) => {
    set(userAtom, update);
  },
);

export const decksStore = createStore()
decksStore.sub(decksAtom, () => {});
