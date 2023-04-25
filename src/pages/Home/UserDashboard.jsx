import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from '../../common/assets/styles.module.css';
import { DeckCard } from '../../common/components/styled/Deck.styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Deck from './Deck';

export default function UserDashboard() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [deckList, setDeckList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	let deckElements = [];

	// fetch user flashcards
	useEffect(() => {
		const id = localStorage.getItem('userId');
		fetch(`http://localhost:3001/deck/${id}`, {
			headers: {
				'Authorization': `Bearer ${authContext.auth.token}`
			}
		})
			.then(res => res.json())
			.then(data => {
				setDeckList(data?.details);
				window.localStorage.setItem('decks', JSON.stringify(data?.details))
			});
	}, []);

	// map data from fetch request to react component
	deckElements = deckList.map(deck => {
		return <Deck deck={deck} key={deck._id}/>;
	});

	const handleAddDeck = () => {
		navigate('/add');
	}

	return(
		<section className={styles['container']}>
			<div>
				<h3>Deck list</h3>
				<p>Manage flashcards or create a new deck</p>
			</div>
			<div className={styles['deck-list']}>
				{(isLoading) 
					? null
					: 
					<DeckCard onClick={(e) => {handleAddDeck()}}>
						<FontAwesomeIcon icon={faPlus} style={{transform: 'scale(2)'}}/>
					</DeckCard>
				
				}
				{deckElements}
			</div>
		</section>
	);
}

