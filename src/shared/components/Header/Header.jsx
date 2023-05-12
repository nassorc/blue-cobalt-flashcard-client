import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSm } from "../../styled/Button.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
	faArrowRightFromBracket,
	faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "./header-icon.png";
import NavLink from "./NavLink";
import DropdownItemLink from "./DropdownItemLink";
export default function Homepage() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const linkRef = useRef(null);
	const dropDownLinkRef = useRef(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("token");
		authContext.setAuth({});
		navigate("/login");
	};
	const authButtons = JSON.stringify(authContext.auth) === "{}" && (
		<>
			<li>
				<Link to="/login">
					<ButtonSm bg="var(--green-color)">Signin</ButtonSm>
				</Link>
			</li>
			<li>
				<Link to="/register">
					<ButtonSm bg="var(--pink-color)">Register</ButtonSm>
				</Link>
			</li>
		</>
	);

	useEffect(() => {
		document.addEventListener("click", (e) => {
			if (e.target !== dropDownLinkRef.current) setShowDropdown(false);
		});
	}, []);

	return (
		<header className="sticky top-0 z-[99] mb-8 w-full h-16 bg-white shadow-bottom shadow-sm shadow-slate-700/50 text-slate-700 transition-all">
			<div className="max-w-5xl h-full mx-auto px-4 flex justify-between align-center">
				<Link
					to="/"
					className="flex justify-center items-center cursor-pointer"
				>
					<div className="mr-3 text-3xl font-bold text-[rgb(40,40,40)] inline-block">
						BlueCobalt
					</div>
					<div className="relative w-14 h-1/2 bg-gray-400 rounded-lg inline-block ">
						<span className="absolute rounded-lg -top-0.5 hover:top-0 bottom-0 -left-0.5 hover:left-0 right-0 w-full h-full flex justify-center items-center bg-gray-100">
							<img src={HeaderIcon} className="max-w-full block w-2/5" />
						</span>
					</div>
				</Link>
				<nav>
					<ul
						className="h-full flex justify-between items-center [&>*]:mr-4"
						onClick={(e) => {
							const styleClasses = [
								"border-b-2",
								"border-md",
								"border-sky-700",
							];
							const li =
								e.target.tagName === "LI" ? e.target : e.target.closest("li");
							if (linkRef.current === null) {
								styleClasses.forEach((className) =>
									li.classList.add(className)
								);
								linkRef.current = li;
							} else {
								// remove previous active link style
								styleClasses.forEach((className) =>
									linkRef.current.classList.remove(className)
								);
								styleClasses.forEach((className) =>
									li.classList.add(className)
								);
								linkRef.current = li;
							}
						}}
					>
						{JSON.stringify(authContext.auth) === "{}" ? null : (
							<>
								<NavLink to="/">Flashcards</NavLink>
								<NavLink to="/explore">Explore</NavLink>
								<NavLink to="/add">Add</NavLink>
								<li
									className="relative drop-shadow-lg z-50 w-10 h-10 bg-slate-400 rounded-full"
									ref={dropDownLinkRef}
									onClick={() => {
										setShowDropdown((prevState) => !prevState);
									}}
								>
									<div
										className={`${showDropdown ? "" : "hidden"
											} bg-white drop-shadow-lg rounded-lg absolute top-14 right-0 w-60 ease-in-out`}
									>
										<DropdownItemLink
											to="/profile"
											leftIcon={<FontAwesomeIcon icon={faUser} />}
										>
											Profile
										</DropdownItemLink>
										<DropdownItemLink
											to="/manage"
											leftIcon={<FontAwesomeIcon icon={faUsersBetweenLines} />}
										>
											Manage Class
										</DropdownItemLink>
										<DropdownItemLink
											leftIcon={
												<FontAwesomeIcon icon={faArrowRightFromBracket} />
											}
											onClick={handleLogout}
										>
											Logout
										</DropdownItemLink>
									</div>
								</li>
							</>
						)}
						{authButtons}
					</ul>
				</nav>
			</div>
		</header>
	);
}
