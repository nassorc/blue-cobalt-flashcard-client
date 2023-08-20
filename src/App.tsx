import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./shared/context/AuthContext";
import { Route, Routes } from "react-router-dom";

// route components
import { LoginPage, RegisterPage } from "./app/auth";
import {
	AddDeckPage,
	EditDeckPage,
	PracticeDeckPage,
	ManageDeckPage,
	ExploreDeckPage,
} from "./deck";
import { ProfilePage, ManageClassPage } from "./user";

// private route handler
import PrivateRoutes from "./components/PrivateRoutes";
import Header from "./shared/components/Header/Header";
import "./App.css";
import { LandingPage } from "./app/landing";
import AuthPage from "./app/auth/AuthPage";
import A from "./components/a/A";

function Sketch() {
  const [drawing, setDrawing] = useState(false);
  return(
    <div>
      <canvas
        onMouseMove={(e) => {
          if (e.target.tagName === "CANVAS" && drawing) {
            const rect = e.target.getBoundingClientRect()
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            const ctx = e.target.getContext("2d")
            ctx.fillStyle = "black"
            ctx.fillRect(x, y, 10, 10);
          }
        }}
        onMouseDown={(e) => {
          setDrawing(true)
        }}
        onMouseUp={(e) => {
          setDrawing(false)
        }}
        onMouseLeave={(e) => {
          setDrawing(false)
        }}
        className="shadow-lg border border-gray-200"
        width="400px"
        height="400px"
      >
      </canvas>
    </div>
  )
}

function App() {
	const authContext = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
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
						<Route path="/add" element={<AddDeckPage />} />
						<Route path="/practice/:id" element={<PracticeDeckPage />} />
						<Route path="/edit/:deckId" element={<EditDeckPage />} />
						<Route path="/explore" element={<ExploreDeckPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/manage" element={<ManageClassPage />} />
					</Route>
					{/* PUBLIC ROUTES */}

          <Route path="/landing-page" element={<LandingPage />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/register" element={<AuthPage />} />
					<Route path="/a" element={<Sketch/>} />
				</Routes>
			)}
		</section>
	);
}

export default App;
