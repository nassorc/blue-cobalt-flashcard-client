import Card from './Card';
import {InputCard} from './InputCard';

export default function DeckCardlistSettings({ deck, dispatch, ACTIONS }) {
    // creates a list of cards
    let CardList = (deck?.modifiedCards)
        ? deck?.modifiedCards?.map(card => {
                return <Card id={card._id} front={card.front} back={card.back} dispatch={dispatch} ACTIONS={ACTIONS} key={card._id} />
            })
        : [];

    return (
        <div style={{width: '100%'}}>
            <InputCard dispatch={dispatch} ACTIONS={ACTIONS}/>
            {CardList}
        </div>
    )
}