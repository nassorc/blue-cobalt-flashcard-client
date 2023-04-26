import Card from '../../pages/EditDeck/components/Card';
import {InputCard} from '../../pages/EditDeck/components/InputCard';

export default function DeckCardlistSettings({ deck, setDeck }) {
    // creates a list of cards
    let CardList = (deck?.modifiedCards)
        ? deck?.modifiedCards?.map(card => {
                return <Card id={card._id} front={card.front} back={card.back} setDeck={setDeck} key={card._id} />
            })
        : [];

    return (
        <div style={{width: '100%'}}>
            <InputCard setDeck={setDeck}/>
            {CardList}
        </div>
    )
}