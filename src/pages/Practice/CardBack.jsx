import updateReviewList from './updateReviewList';
import { Back } from '../../common/components/styled/Flashcard.styled';

export default function CardBack({ cardDetails, gradeCardProp, showMeaningProp, setShowMeaningProp, cards, setCards }) {
    const handleGradeButton = (grade) => {
        gradeCardProp(cardDetails._id, grade);
        setShowMeaningProp(!showMeaningProp);
        updateReviewList(grade, cardDetails._id, cards, setCards)
    }
    return(
        <Back>
            <div className="practice-header">
                    <div className="front">{cardDetails.front}</div> 
                    <div className="back">{cardDetails.back}</div>
                </div>
                <div className="practice-buttons">
                    <button onClick={(e) => handleGradeButton(0)}>Blackout</button>
                    <button onClick={(e) => handleGradeButton(1)}>Very Hard</button>
                    <button onClick={(e) => handleGradeButton(2)}>Hard</button>
                    <button onClick={(e) => handleGradeButton(3)}>Easy but struggled a bit</button>
                    <button onClick={(e) => handleGradeButton(4)}>Easy but hesitated</button>
                    <button onClick={(e) => handleGradeButton(5)}>Flawless</button>
            </div>
        </Back>
    )
}