import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import {InputSm} from './styled/Input.styled'

export default function DeckPracticeSettings({deck, dispatch, ACTIONS}) {
    return (
        <div>
            <p>Number of cards added each review session</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label style={{fontWeight: 'bold'}}>new cards:</label>
                    <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                </div>
                <InputSm type="input" value={deck?.newCardCount} onChange={(e) => {
                    dispatch({ type: ACTIONS.UPDATE_DECK, payload: { newCardCount: e.target.value } })
                }}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label style={{fontWeight: 'bold'}}>reviewed cards:</label>
                    <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                </div>
                <InputSm type="input" value={deck?.reviewedCardCount} onChange={(e) => {
                    dispatch({ type: ACTIONS.UPDATE_DECK, payload: { reviewedCardCount: e.target.value } })
                }}/>
            </div>
        </div>
    )
}