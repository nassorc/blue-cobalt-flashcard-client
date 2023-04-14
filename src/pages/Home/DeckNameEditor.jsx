import styles from '../../assets/styles.module.css';

export default function DeckNameEditor({ initialValue, setValue }) {
	return(
		<div className={styles['deck-name-input']}>
			<input value={initialValue} onChange={(e) => {
				setValue(e.target.value);
			}}/>
		</div>
	);
}