import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import DeckNameEditor from './DeckNameEditor';
import styles from '../../assets/styles.module.css';
import { ButtonSm } from '../../components/styles/Button.styled';
import { Badge } from '../../components/styles/Badge.styled';
import textTruncation from '../../utils/textTruncation';
import ColorThief from 'colorthief'

export default function Deck({ deck}) {
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
	const handleUpdateClick = async(e) => {
		const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/deck/${deck._id}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${authContext.auth.token}`
			},
			body: JSON.stringify({details: { 'deckName': name }})
		});
		const data = await res.json();
		console.log(data);
		setIsEditing(!isEditing);

	};
	let editButton = (isEditing) 
		? <button 
			className={styles['deck-button']}
			onClick={handleUpdateClick}
		>
			Update
		</button>
		: <button 
			className={styles['deck-button']}
			onClick={handleEditClick}
		>
			Edit
		</button>;

	// Function uses the current deck image and extracts the dominant color
	// Used to set the background color of a component if deck image doesn't
	// fill the entire component.
	const extractDominantColor = () => {
		let rgb = [0,0,0]
		if(deck?.deckImage) {
			const img = document.createElement('img')
			img.src = `${deck?.deckImage}`
			rgb = colorthief.getColor(img)
			return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
		}
		return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	}

	let backgroundImage = (deck?.deckImage) ? {backgroundImage: `url(${deck?.deckImage})`, backgroundColor: extractDominantColor()} : {backgroundColor: "darkseagreen"}
	return(
		<div className={styles['deck']} style={backgroundImage}>
			<div>
				<div>
					<h3 className={styles['deck-name']}>{textTruncation(name, 20)}</h3>
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
		</div>
	);
}