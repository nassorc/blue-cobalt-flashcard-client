import ImageIcon from './ImageIcon';
import {InputSm} from '../../../shared/styled/Input.styled'
import deckStyles from '../assets/deck.module.css'

export default function DeckInformationSettings({deck, dispatch, ACTIONS}) {
    return (
        <div className={deckStyles['split']}>
            <ImageIcon image={deck?.deckImage}/>
            <div className={deckStyles.ml2}>
                <label style={{fontWeight: 'bold'}}>Deck name: </label>
                <InputSm value={deck?.deckName} onChange={(e) => {
                    dispatch({ type: ACTIONS.UPDATE_DECK, payload: {deckName: e.target.value}})
                }
                }/>

                <div>
                    <label style={{fontWeight: 'bold'}}>Deck Image: </label>
                    <input
                        style={{width: '220px'}} 
                        type="file" accept=".jpg, .jpeg, .png" 
                        id="img-field"
                        onChange={async (e) => {
                            const {handleUploadImageEvent} = await import('../../../utils/uploadImage')
                            handleUploadImageEvent(e.target.files, (deckInformation) => {
                                dispatch({ type: ACTIONS.UPDATE_DECK, payload: {...deckInformation}})
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}