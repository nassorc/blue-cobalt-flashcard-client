import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import {InputSm} from '../../../components/styles/Input.styled';

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
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label htmlFor='front' style={{fontWeight: 'bold'}}>Front</label>
                    <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                </div>
                <InputSm type="input" value={front} onChange={(e) => {
                    setFront(e.target.value);
                }}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label htmlFor='back' style={{fontWeight: 'bold'}}>Back</label>
                    <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                </div>
                <InputSm type="input" value={back} onChange={(e) => {
                    setBack(e.target.value);
                }}/>
            </div>
            </div>
            <div>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
    // return(
    //     <div>
    //         <div>
    //             <label htmlFor='front'>front</label>
    //             <input type='text' value={front} onChange={(e) => {
    //                 setFront(e.target.value);
    //             }}/>
    //         </div>
    //         <div>
    //             <label htmlFor='back'>back</label>
    //             <input type='text' value={back} onChange={(e) => {
    //                 setBack(e.target.value);
    //             }}/>
    //         </div>
    //         <div>
    //             <button onClick={handleAdd}>add</button>
    //         </div>
    //     </div>
    // )
}