import { useState, useEffect, useContext } from "react";
import AuthContext from "./lib/context/AuthContext";
// import AuthContext from "/lib/context/auth/AuthContext";

import { Route, Routes, useNavigate } from "react-router-dom";
// private route handler
import PrivateRoutes from "./components/PrivateRoutes";

import {
  AddDeckPage,
  EditDeckPage,
  PracticeDeckPage,
  ManageDeckPage,
  ExploreDeckPage,
} from "./app/deck";
import { ManageClassPage } from "./app/user";
import { ProfilePage } from "./app/profile";
import Header from "./components/Header";
import { LandingPage } from "./app/landing";
import AuthPage from "./app/auth/AuthPage";
import { useUserManagement } from "./lib/useUserManagement";

import "./App.css";

function App({}) {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const { logout } = useUserManagement();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");
    if (userId && token) {
      authContext.setAuth({ userId, token });
    }
    setIsLoading(!isLoading);
  }, []);

  return (
    <section className="min-h-screen bg-website-background">
      <Header />
      {isLoading ? null : (
        <Routes>
          {/* PRIVATE ROUTES */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<ManageDeckPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/practice/:id" element={<PracticeDeckPage />} />
            {/* 
            <Route path="/edit/:deckId" element={<EditDeckPage />} />
            <Route path="/explore" element={<ExploreDeckPage />} />
            */}
          </Route>
          {/* PUBLIC ROUTES */}
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      )}
    </section>
  );
}

export default App;
