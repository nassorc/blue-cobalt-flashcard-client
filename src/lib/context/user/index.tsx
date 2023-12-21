import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  Dispatch,
} from "react";
import { useAuth } from "../auth";
import config from "@/lib/config";

export interface UserType {
  _id: string;
  email: string;
  username: string;
  profileImage: string;
  biography: string;
  decks: any[];
  firstname: string;
  lastname: string;
}
const initialData = {
  _id: "",
  email: "",
  username: "",
  profileImage: "",
  biography: "",
  decks: [],
  firstname: "",
  lastname: "",
};
const UserContext = createContext<{
  user: UserType;
  setUser: Dispatch<UserType>;
}>({
  user: initialData,
  setUser: () => {},
});

export function useUser() {
  const userContext = useContext(UserContext);
  return {
    user: userContext.user,
    setUser: userContext.setUser,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [authState, _authDispatch, isUserAuthenticated] = useAuth();
  const [user, setUser] = useState<UserType>(initialData);
  // if (!isUserAuthenticated || !authState.userId) return;
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(config.api.user.get(authState.userId), {
        credentials: "include",
      });
      return await res.json();
    }
    fetchUser().then((user) => {
      setUser(user.user);
    });
  }, [authState]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
