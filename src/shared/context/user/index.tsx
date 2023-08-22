import { useState, useEffect, createContext, ReactNode } from "react";
import { useAuth } from "../auth";

const UserContext = createContext({})

export function UserProvider({children}: {children: ReactNode}) {
  const [authState, _authDispatch, isUserAuthenticated] = useAuth();
  const [user, setUser] = useState({});
  if(!isUserAuthenticated || !authState.userId) return
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:3001" + "/user/" + authState.userId, {
        credentials: "include",
      });
      return await res.json()
    }
    fetchUser()
      .then(user => console.log("logging user", user))
  }, [authState])
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}