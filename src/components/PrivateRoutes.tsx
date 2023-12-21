import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/context/auth";
import { useUserManagement } from "@/lib/useUserManagement";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store/user";

const PrivateRoutes = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const {isAuthenticated} = useUserManagement();

  const [user] = useAtom(userAtom);

  useEffect(() => {
    const f = async () => {
      const is = await isAuthenticated();
      setAuthenticated(!!is);
    }
    f();
  }, []);

  if(authenticated == null) {
    return <></>
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
