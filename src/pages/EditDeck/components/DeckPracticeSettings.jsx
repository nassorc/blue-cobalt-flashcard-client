import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import {InputSm} from '../../../common/components/styled/Input.styled'

export default function DeckPracticeSettings({deck, setDeck}) {
    return (
        <div>
            <p>Number of cards added each review session</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label style={{fontWeight: 'bold'}}>new cards:</label>
                    <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                </div>
                <InputSm type="input" value={deck?.newCardCount} onChange={(e) => {
                    setDeck(prevState => {
                        return {...prevState, newCardCount: e.target.value}
                    })
                }}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label style={{fontWeight: 'bold'}}>reviewed cards:</label>
                    <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                </div>
                <InputSm type="input" value={deck?.reviewedCardCount} onChange={(e) => {
                    setDeck(prevState => {
                        return {...prevState, reviewedCardCount: e.target.value}
                    })
                }}/>
            </div>
        </div>
    )
}