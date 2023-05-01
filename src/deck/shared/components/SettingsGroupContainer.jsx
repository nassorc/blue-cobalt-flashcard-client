import deckStyles from '../assets/deck.module.css'

export default function SettingsGroupContainer({title, desc, children}) {
    return(

        <div className={deckStyles['group']}>
            <div>
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
            <div>
                {children} 
            </div>
        </div>
    )
}