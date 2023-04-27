import { Front } from '../../common/components/styled/Flashcard.styled';

export default function CardFront({ cardDetails, showMeaningProp, setShowMeaningProp, handleEditClick }) {
    const handleShowClick = (e) => {
        setShowMeaningProp(!showMeaningProp);

    }
    return(
        <Front>
            {/* <img src="https://picsum.photos/100/100"/> */}
            <div className="practice-header">
                    <div className="front" style={{ marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center', fontSize: '20px'}}>{cardDetails.front}</div>
                </div>
                <div className="practice-buttons">
                    <button onClick={handleShowClick}>Show</button>
                    <span>  </span>
                    <button onClick={handleEditClick}>Edit deck</button>
            </div>
        </Front>
    );
}