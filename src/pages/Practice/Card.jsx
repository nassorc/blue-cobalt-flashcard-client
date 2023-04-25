import { useState, useEffect, useContext } from 'react';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { Flashcard, FlashcardContainer } from '../../common/components/styled/Flashcard.styled';


export default function Card({ cardDetails, gradeCard, handleEditClick, cards, setCards }) {
    const [showMeaning, setShowMeaning] = useState(false);  // if true, shows back of card

    return(
        <FlashcardContainer>
            <Flashcard rotate={(showMeaning) ? 180 : null}>
                {/* {showMeaning */}
                    {/* ?  */}
                    <CardBack cardDetails={cardDetails} gradeCardProp={gradeCard} showMeaningProp={showMeaning} setShowMeaningProp={setShowMeaning} cards={cards} setCards={setCards}/>
                    {/* :  */}
                    <CardFront cardDetails={cardDetails} showMeaningProp={showMeaning} setShowMeaningProp={setShowMeaning} handleEditClick={handleEditClick}/>
                {/* } */}
            </Flashcard>
        </FlashcardContainer>
    )
}