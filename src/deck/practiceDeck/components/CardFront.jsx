export default function CardFront({
    cardDetails,
    showMeaningProp,
    setShowMeaningProp,
}) {
    const handleShowClick = (e) => {
        setShowMeaningProp(!showMeaningProp);
    };
    return (
        <div className="p-4 absolute w-full h-full flex flex-col items-center justify-between rounded-lg">
            <div>
                <div className="m-0 font-bold text-lg">{cardDetails.front}</div>
            </div>
            <div className="w-full h-0.5 bg-black"></div>
            <button
                className="py-2 px-8 w-full border border-slate-400 rounded-lg bg-white"
                onClick={handleShowClick}
            >
                show
            </button>
        </div>
    );
}
