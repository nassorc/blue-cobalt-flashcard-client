import updateReviewList from '../../shared/utils/updateReviewList';

export default function CardBack({ cardDetails, gradeCardProp, showMeaningProp, setShowMeaningProp, cards, setCards }) {
    const handleGradeButton = (grade) => {
        gradeCardProp(cardDetails._id, grade);
        setShowMeaningProp(!showMeaningProp);
        updateReviewList(grade, cardDetails._id, cards, setCards)
    }
    const BackButton = (props) => {
        const {children, background, color, ...buttonProps} = props;
        return (
            <button 
                {...buttonProps}
                className={`px-2 py-1 ${(background) ? background : 'bg-sky-200'} ${(color) ? color : 'white'} border-[1px] border-black/50 rounded-md`}
            >
                {children}
            </button>
        )
    }
    return(
        <>
        <div  className='p-4 absolute w-full h-full flex flex-col items-center justify-around bg-slate-200 rounded-lg border border-sm border-slate-400' style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
            <div>
                <div className='m-0 font-bold text-lg'>{cardDetails.front}</div>
            </div>
            <div className='w-full h-0.5 bg-black'></div>
            <div className="back" style={{textAlign: 'center', fontSize: '18px'}}>{cardDetails.back}</div>
            <div className='[&>*]:mr-2'>
                <BackButton background='bg-rose-600' color='text-white' onClick={(e) => handleGradeButton(0)}>Blackout</BackButton>
                <BackButton background='bg-rose-800' color='text-white' onClick={(e) => handleGradeButton(1)}>Very Hard</BackButton>
                <BackButton background='bg-rose-900' color='text-white' onClick={(e) => handleGradeButton(2)}>Hard</BackButton>
                <BackButton background='bg-green-900' color='text-white' onClick={(e) => handleGradeButton(3)}>Easy</BackButton>
                <BackButton background='bg-green-800' color='text-white' onClick={(e) => handleGradeButton(4)}>Good</BackButton>
                <BackButton background='bg-green-600' color='text-white' onClick={(e) => handleGradeButton(5)}>Flawless</BackButton>
            </div>
        </div>
        </>
    )
}