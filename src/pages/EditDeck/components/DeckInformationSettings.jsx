import ImageIcon from './ImageIcon';

import { SettingsGroupItem } from './styled/SettingsGroupItem.styled'
import {InputSm} from '../../../common/components/styled/Input.styled'


export default function DeckInformationSettings({deck, setDeck}) {
    return (
        <SettingsGroupItem>
            <ImageIcon image={deck?.deckImage}/>
            <div>
                <label style={{fontWeight: 'bold'}}>Deck name: </label>
                <InputSm value={deck?.deckName} onChange={(e) => {
                    setDeck(prevState => {
                        return {...prevState, deckName: e.target.value}
                    })
                }
                }/>
                <div>
                    <label style={{fontWeight: 'bold'}}>Deck Image: </label>
                    <input 
                        type="file" accept=".jpg, .jpeg, .png" 
                        id="img-field"
                        onChange={async (e) => {
                            setDeck(prevState => {
                                return {
                                    ...prevState,
                                    deckImageFile: e.target.files[0]
                                }
                            })
                            const {handleUploadImageEvent} = await import('../utils/uploadImage')
                            handleUploadImageEvent(e.target.files, setDeck)
                        }}
                    />
                </div>
            </div>
        </SettingsGroupItem>
    )
}