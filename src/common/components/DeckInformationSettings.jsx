import ImageIcon from './ImageIcon';

import {InputSm} from './styled/Input.styled'


export default function DeckInformationSettings({deck, dispatch, ACTIONS}) {
    return (
        <>
        <ImageIcon image={deck?.deckImage}/>
        <div>
            <label style={{fontWeight: 'bold'}}>Deck name: </label>
            <InputSm value={deck?.deckName} onChange={(e) => {
                dispatch({ type: ACTIONS.UPDATE_DECK, payload: {deckName: e.target.value}})
            }
            }/>
            <div>
                <label style={{fontWeight: 'bold'}}>Deck Image: </label>
                <input 
                    type="file" accept=".jpg, .jpeg, .png" 
                    id="img-field"
                    onChange={async (e) => {
                        const {handleUploadImageEvent} = await import('../../utils/uploadImage')
                        handleUploadImageEvent(e.target.files, (deckInformation) => {
                            dispatch({ type: ACTIONS.UPDATE_DECK, payload: {
                                deckImageFile: e.target.files[0],
                                ...deckInformation
                            }})
                        })
                    }}
                />
            </div>
        </div>
        </>
    )
}