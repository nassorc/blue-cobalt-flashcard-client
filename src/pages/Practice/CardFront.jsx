import { Front } from '../../common/components/styled/Flashcard.styled';

export default function CardFront({ cardDetails, showMeaningProp, setShowMeaningProp, handleEditClick }) {
    const handleShowClick = (e) => {
        setShowMeaningProp(!showMeaningProp);

    }
    return(
        <Front>
            <img src="https://picsum.photos/400/200"/>
            <div className="practice-header">
                    <div className="front">{cardDetails.front}</div>
                </div>
                <div className="practice-buttons">
                    <button onClick={handleShowClick}>Show</button>
                    <button onClick={handleEditClick}>Edit deck</button>
            </div>
        </Front>
    );
}