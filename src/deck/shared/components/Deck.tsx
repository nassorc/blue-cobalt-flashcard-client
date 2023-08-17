import { LazyLoadImage } from "react-lazy-load-image-component";
import { Blurhash } from "react-blurhash";
import {
	faLayerGroup,
	faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonSm } from "../../../shared/styled/Button.styled";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from "../../../shared/assets/styles.module.css";
import {
	DisplayDeck,
	DisplayDeckImageContainer,
	DisplayDeckContent,
} from "../../../shared/styled/DisplayDeck.styled";
import BadgeComponent from "./Badge/BadgeComponent";

import GraduateIcon from "../assets/graduate-icon.png";

export default function Deck({ deck, removeButtons }) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const navigate = useNavigate();
	const handlePracticeClick = (e) => {
		navigate(`/practice/${deck._id}`);
	};
	const handleEditClick = (e) => {
		navigate(`/edit/${deck._id}`);
	};

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setImageLoaded(true);
		};
		img.src = deck?.deckImage;
	}, [deck]);

	return (
		<DisplayDeck>
			<DisplayDeckImageContainer>
				{!imageLoaded && deck?.blurhash ? (
					<Blurhash
						hash={deck?.blurhash}
						width={"100%"}
						height={"100%"}
						resolutionX={32}
						resolutionY={32}
						punch={1}
					/>
				) : null}
				{deck?.deckImage && (
					<LazyLoadImage
						className="object-cover w-full h-full"
						src={deck?.deckImage}
					/>
				)}
			</DisplayDeckImageContainer>
			<DisplayDeckContent>
				<>
					<div>
						<span className="cursor-auto font-bold text-lg">
							{deck?.deckName}
						</span>
					</div>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<BadgeComponent
								icon={
									<FontAwesomeIcon
										icon={faLayerGroup}
										style={{ color: "rgba(0, 0, 0, 0.7)" }}
									/>
								}
								info={deck?.cards?.length}
							/>
							<BadgeComponent
								icon={
									<FontAwesomeIcon
										icon={faGraduationCap}
										style={{ color: "rgba(0, 0, 0, 0.7)" }}
									/>
								}
								info={
									deck?.cards?.filter((card) => card.status === "reviewed")
										.length
								}
							/>
						</div>
						<div
							className={styles["button-container"]}
							style={{
								display: removeButtons ? "none" : "flex",
							}}
						>
							<ButtonSm
								bg="white"
								color="black"
								borderColor="rgba(0,0,0,0.5)"
								onClick={handlePracticeClick}
							>
								Practice
							</ButtonSm>
							<ButtonSm
								bg="white"
								color="black"
								borderColor="rgba(0,0,0,0.5)"
								onClick={handleEditClick}
							>
								Edit
							</ButtonSm>
						</div>
					</div>
				</>
			</DisplayDeckContent>
		</DisplayDeck>
	);
}
