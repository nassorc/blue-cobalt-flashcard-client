import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import DeckNameEditor from './DeckNameEditor';
import styles from '../../assets/styles.module.css';

export default function Deck({ deck}) {
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

	// switch between card name, and input box for editing
	let deckHeaderName = (isEditing) 
		? <DeckNameEditor initialValue={name} setValue={setName} /> 
		: <h3 className={styles['deck-name']} onMouseOver={() => {
			console.log('hovering')
		}}>{ name }</h3>;
		
	return(
		<div className={styles['deck']}>
			<div>
				<div>
					{deckHeaderName}
				</div>
				<div className={styles['deck-footer']}>
					<div>
						<div className={styles['badge']} data-text="total cards">
							<FontAwesomeIcon icon={faLayerGroup} />
							<p>{deck?.cards?.length}</p>
						</div>
						<div className={styles['badge']} data-text="reviewed cards">
							<FontAwesomeIcon icon={faGraduationCap} />
							<p>{deck?.reviewList?.length}</p>
						</div>
					</div>
					<div className={styles['button-container']}>
						<button
							className={styles['deck-button']} 
							onClick={handlePracticeClick}
						>
							Practice
						</button>
						<button
							className={styles['deck-button']}
							onClick={handleEditClick}
						>
							Edit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}