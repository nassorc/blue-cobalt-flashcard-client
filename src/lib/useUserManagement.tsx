
import { useAtom } from "jotai";
import { userAtom, accessTokenAtom } from "./store/user";
import { login as apiLogin, logout as apiLogout, validateToken, getUserProfile } from "./api";
import { useState } from "react";

export function useUserManagement() {
  const [user, setUser] = useAtom(userAtom); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const login = async (credential: any) => {
    setLoading(true);
    try {
 // authState.     console.log("should be logging")
      await apiLogin(credential);
      let accessToken = Object.fromEntries(
        [document.cookie.split(";")[0].split("=")]
      )["accessToken"];

      setAccessToken(accessToken);

      const profile = await getUserProfile();
      setUser({...profile});

      return true;
    }
    catch(err: any) {
      console.log(err.message)
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  const register = async (credential: any) => {
    setLoading(true);
    try {
      const userData = await apiLogin(credential);

      setUser({...userData});
      return true;
    }
    catch(err: any) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }


  const isAuthenticated = (): boolean => {
    if(!accessToken) {
      return false;
    }
    // const { valid } = await validateToken(accessToken)
    // if(!valid) {
    //   return false;
    // }
    return true;
  }

  const logout = async () => {
    await apiLogout();
    setAccessToken("");
    setUser({});
    localStorage.clear();
  }

  return {
    login,
    logout,
    isAuthenticated,
    error,
    loading
  }
} 
