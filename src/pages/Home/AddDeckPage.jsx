import { useState, useEffect } from 'react';
import styles from '../../common/assets/styles.module.css';

function emulateServer(input) {
	return [
		{
			front: 'Programming',
			back: 'is the proces of build software.'
		},
		{
			front: 'Data structures',
			back: 'are a container for organzing data, and are the buidling blocks of application'
		}
	];
}

function Block({txt, isDefinition}) {
	let spans = [];
	spans = (txt.split(' ').map((word) => {
		return <Span txt={word}/>;
	}));
	return (
		<code className={
			isDefinition 
				? styles['definition']
				: styles['meaning']
		}>{spans}</code>
	);
}

function Span({txt}) {
	return <span> {txt}</span>;
}

export default function AddDeckPage() {
	const [data, setData] = useState();
	let blockList = [];

	useEffect(() => {
		setData(emulateServer());
	}, []);

	if(data) {
		for(let i = 0; i < data.length; ++i) {
			const definition = data[i].front;
			const meaning = data[i].back;

			blockList.push(<Block txt={definition} isDefinition={true} />);
			blockList.push(<Block txt={meaning} isDefinition={false} />);
		}

	}
    
	return (
		<div className={styles['container']}>
			<h1>Add Deck</h1>
			<textarea></textarea>
			{ blockList }
			<div>
				<div>
					<input />
					<button>Add</button>
				</div>
				<div>
                    front: something <br />
                    back: something
				</div>
			</div>
		</div>
	);
}