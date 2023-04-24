import { useState } from 'react'

export default function Card({id, front, back, setModifiedCards}) {
    const [isEdit, setIsEdit] = useState(false);
    const [frontField, setFrontField] = useState(front.slice());
    const [backField, setBackField] = useState(back.slice());
    const handleDelete = (e) => {
        setModifiedCards(prevState => {
            let updated = prevState.filter((card) => card._id !== id)
            return [...updated]
        })
    }
    const handleEdit = (e) => {
        setFrontField(front)
        setBackField(back)
        setIsEdit(!isEdit)
    }
    const handleUpdate = (e) => {
        setModifiedCards(prevState => {

            let card = prevState.reduce((current, elm) => (elm._id === id) ? elm : current);
            let temp = {...card}
            temp.front = frontField;
            temp.back = backField;

            return [temp, ...prevState.filter((card) => card._id !== id)]
        })
        setIsEdit(!isEdit)
    }
    const handleCancel = (e) => {
        setIsEdit(!isEdit)

    }
    let cardComponent = 
        (!isEdit) ? 

                <>
                <div>
                    <div>
                        <span style={{fontWeight: 'bold'}}> {front}</span>
                    </div>
                    
                    <div>
                        <span> {back}</span>
                    </div>
                </div>

                <div>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>edit</button>
                </div>
                </>

            :
            <div>
                <label>front:</label>
                <input value={frontField} onChange={(e) => {setFrontField(e.target.value)}}/>
                <br />
                <label>back:</label>
                <input value={backField} onChange={(e) => {setBackField(e.target.value)}}/>
                <div>
                    <button onClick={handleUpdate}>update</button>
                    <button onClick={handleCancel}>cancel</button>
                </div>
            </div>
    return (
        <div style={
            {
                width: '400px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '18px 8px',
                margin: '6px 0',
                borderRadius: '10px',
                boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.2)',
            }}>
            {cardComponent}
        </div>
    )
}