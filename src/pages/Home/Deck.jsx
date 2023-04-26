import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import styles from '../../common/assets/styles.module.css';
import { DeckCard } from '../../common/components/styled/Deck.styled'
import { ButtonSm } from '../../common/components/styled/Button.styled';
import { Badge } from '../../common/components/styled/Badge.styled';
import textTruncation from '../../utils/textTruncation';
import ColorThief from 'colorthief'

export default function Deck({ deck }) {
	const colorthief = new ColorThief()
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(deck.deckName);

	const handlePracticeClick = (e) => {
		navigate(`/practice/${deck._id}`);
	};
	const handleEditClick = (e) => {
		navigate(`/edit/${deck._id}`);
	};

	// Function uses the current deck image and extracts the dominant color
	// Used to set the background color of a component if deck image doesn't
	// fill the entire component.
	const extractDominantColor = () => {
		let rgb = [0,0,0]
		if(deck?.deckImage.length > 0) {
			const img = document.createElement('img')
			img.src = `${deck?.deckImage}`
			// function may run without a size which will produce an error.
			// checks if size if greater than 0.
			if(img.width > 0) {
				rgb = colorthief.getColor(img)
				return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
			}
			// waits for image to load before calling getcolor.
			// img.addEventListener('onload', () => {
			// 	rgb = colorthief.getColor(img)
			// 	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
			// })
			
			
		}
		return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	}
	// broken: extractDominantColor
	// let backgroundImage = (deck?.deckImage) ? {backgroundImage: `url(${deck?.deckImage})`, backgroundColor: extractDominantColor()} : {backgroundColor: "darkseagreen"}
	let backgroundImage = (deck?.deckImage) ? {backgroundImage: `url(${deck?.deckImage})`, backgroundColor: 'rgb(40,40,40)'} : {backgroundColor: "darkseagreen"}
	return(
		<DeckCard style={backgroundImage}>
			<div>
				<div>
					{(name)
						? <h3 className={styles['deck-name']}>{textTruncation(name, 20)}</h3>
						: <h3 className={styles['deck-name']}>No Name</h3>
					}
				</div>
				<div className={styles['deck-footer']}>
					<div>
						<Badge>
							<FontAwesomeIcon icon={faLayerGroup} style={{color: 'rgba(0, 0, 0, 0.7)'}} />
							<p>{deck?.cards?.length}</p>
						</Badge>
						<Badge>
							<FontAwesomeIcon icon={faGraduationCap} style={{color: 'rgba(0, 0, 0, 0.7)'}}/>
							<p>{deck?.reviewList?.length}</p>
						</Badge>
					</div>
					<div className={styles['button-container']}>
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
			</div>
		</DeckCard>
	);
}