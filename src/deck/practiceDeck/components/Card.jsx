import { useState } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function Card({
    cardDetails,
    gradeCard,
    handleEditClick,
    cards,
    setCards,
}) {
    const [showMeaning, setShowMeaning] = useState(false); // if true, shows back of card
    let rotateStyle = showMeaning ? { transform: "rotateY(180deg)" } : {};
    return (
        <div
            className="w-full h-48 absolute transition-all duration-500 ease"
            style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                ...rotateStyle,
            }}
        >
            <CardBack
                cardDetails={cardDetails}
                gradeCardProp={gradeCard}
                showMeaningProp={showMeaning}
                setShowMeaningProp={setShowMeaning}
                cards={cards}
                setCards={setCards}
            />
            <CardFront
                cardDetails={cardDetails}
                showMeaningProp={showMeaning}
                setShowMeaningProp={setShowMeaning}
                handleEditClick={handleEditClick}
            />
        </div>
    );
}
