import { useState, useEffect, useContext } from 'react';
import CardFront from './CardFront';
import CardBack from './CardBack';

import styles from '../../assets/styles.module.css';

export default function Card({ cardDetails, gradeCard, handleEditClick, cards, setCards, updateReviewList }) {
    const [showMeaning, setShowMeaning] = useState(false);  // if true, shows back of card

    return(
        <div>
            {showMeaning 
                ? <CardBack cardDetails={cardDetails} gradeCardProp={gradeCard} showMeaningProp={showMeaning} setShowMeaningProp={setShowMeaning} cards={cards} setCards={setCards} updateReviewList={updateReviewList}/> 
                : <CardFront cardDetails={cardDetails} showMeaningProp={showMeaning} setShowMeaningProp={setShowMeaning} handleEditClick={handleEditClick}/>}
        </div>
    )
}