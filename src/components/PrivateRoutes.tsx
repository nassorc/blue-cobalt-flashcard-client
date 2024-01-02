import { ReactNode, useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";
import { useUserManagement } from "@/lib/useUserManagement";
import { useAtom, Provider as AtomProvider } from "jotai";
import { userAtom, decksStore, decksAtom } from "@/lib/store/user";
import { useQuery } from "react-query";
import { getUserProfile } from "@/lib/api";

function AuthRoute() {
  const [user, setUser] = useAtom(userAtom);
  const [decks, setDecks] = useAtom(decksAtom);
  const [temp, setTemp] = useState({});
  const query = useQuery({ queryKey: ["user"], queryFn: getUserProfile, onSuccess: (data) => {
      setUser({...data});
      setDecks(data);
  }})

  return <AtomProvider store={decksStore}>
    <Outlet />
  </AtomProvider>;
}

function PrivateRoutes() {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const { isAuthenticated } = useUserManagement();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const is = await isAuthenticated();
      setAuthenticated(!!is);
    };
    checkIfAuthenticated();
  }, []);

  if (authenticated == null) {
    return <></>;
  }

  return authenticated ? <AuthRoute /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
