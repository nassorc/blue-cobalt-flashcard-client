import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from '../../common/assets/styles.module.css';


import Deck from './Deck';

export default function UserDashboard() {
	const authContext = useContext(AuthContext);
	const [deckList, setDeckList] = useState([]);
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
	// console.log(deckList[1]?.deckImage)
	// map data from fetch request to react component
	deckElements = deckList.map(deck => {
		return <Deck deck={deck} key={deck._id}/>;
	});

	return(
		<section className={styles['container']}>
			<div>
				<h3>Deck list</h3>
				<p>Manage flashcards or create a new deck</p>
			</div>
			<div className={styles['deck-list']}>
				{deckElements}
			</div>
		</section>
	);
}

