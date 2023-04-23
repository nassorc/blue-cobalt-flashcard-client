import { useState } from 'react'
export default function InputCard({ setModifiedCards }) {    
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleAdd = (e) => {
        const newCard = {
            front,
            back,
        }
        setModifiedCards(prevState => {
            return [newCard,...prevState]
        })
        setFront('')
        setBack('')
    }
    return(
        <div>
            <div>
                <label htmlFor='front'>front</label>
                <input type='text' value={front} onChange={(e) => {
                    setFront(e.target.value);
                }}/>
            </div>
            <div>
                <label htmlFor='back'>back</label>
                <input type='text' value={back} onChange={(e) => {
                    setBack(e.target.value);
                }}/>
            </div>
            <div>
                <button onClick={handleAdd}>add</button>
            </div>
        </div>
    )
}