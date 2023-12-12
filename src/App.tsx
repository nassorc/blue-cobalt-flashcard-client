import { useState, useEffect, useContext, useRef } from "react";
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
import { ManageClassPage } from "./user";
import { ProfilePage } from "./app/profile";

// private route handler
import PrivateRoutes from "./components/PrivateRoutes";
// import Header from "./shared/components/Header/Header";
import Header from "./components/header/Header";
import "./App.css";
import { LandingPage } from "./app/landing";
import AuthPage from "./app/auth/AuthPage";


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
				</Routes>
			)}
		</section>
	);
}

export default App;
