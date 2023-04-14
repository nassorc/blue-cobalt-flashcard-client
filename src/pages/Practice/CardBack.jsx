export default function CardBack({ cardDetails, gradeCardProp, showMeaningProp, setShowMeaningProp, cards, setCards, updateReviewList }) {
    return(
        <div>
            <div className="practice-header">
                    <div className="front">{cardDetails.front}</div> 
                    <div className="back">{cardDetails.back}</div>
                </div>
                <div className="practice-buttons">
                    <button onClick={(e) => {gradeCardProp(cardDetails._id, 0); setShowMeaningProp(!showMeaningProp); updateReviewList(0, cardDetails._id, cards, setCards)}}>Blackout</button>
                    <button onClick={(e) => {gradeCardProp(cardDetails._id, 1); setShowMeaningProp(!showMeaningProp); updateReviewList(1, cardDetails._id, cards, setCards)}}>Very Hard</button>
                    <button onClick={(e) => {gradeCardProp(cardDetails._id, 2); setShowMeaningProp(!showMeaningProp); updateReviewList(2, cardDetails._id, cards, setCards)}}>Hard</button>
                    <button onClick={(e) => {gradeCardProp(cardDetails._id, 3); setShowMeaningProp(!showMeaningProp); updateReviewList(3, cardDetails._id, cards, setCards)}}>Easy but struggled a bit</button>
                    <button onClick={(e) => {gradeCardProp(cardDetails._id, 4); setShowMeaningProp(!showMeaningProp); updateReviewList(4, cardDetails._id, cards, setCards)}}>Easy but hesitated</button>
                    <button onClick={(e) => {gradeCardProp(cardDetails._id, 5); setShowMeaningProp(!showMeaningProp); updateReviewList(5, cardDetails._id, cards, setCards)}}>Flawless</button>
            </div>
        </div>
    )
}