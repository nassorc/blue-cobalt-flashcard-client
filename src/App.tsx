import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./shared/context/AuthContext";
import { Route, Routes } from "react-router-dom";

// route components
import { LoginPage, RegisterPage } from "./auth";
import {
	AddDeckPage,
	EditDeckPage,
	PracticeDeckPage,
	ManageDeckPage,
	ExploreDeckPage,
} from "./deck";
import { ProfilePage, ManageClassPage } from "./user";

// private route handler
import PrivateRoutes from "./utils/PrivateRoutes";
import Header from "./shared/components/Header/Header";
import "./App.css";
import { LandingPage } from "./landing";
import AuthPage from "./auth/AuthPage";
import A from "./components/a/A";

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
		<section className="h-screen ">
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

          <Route path="/landing" element={<LandingPage />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/register" element={<AuthPage />} />
					<Route path="/a" element={<A />} />
				</Routes>
			)}
		</section>
	);
}

export default App;
