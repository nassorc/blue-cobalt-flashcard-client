import { SettingsGroup } from "./styled/SettingsGroup.styled";

export default function DeckDetailsSettings({deckImage, deckName, setDeckName, setDeckImageFile, }) {
    return (
        <SettingsGroupItem>
            <ImageIcon image={deckImage}/> 
            <div>
                <label style={{fontWeight: 'bold'}}>Deck name: </label>
                <InputSm value={deckName} onChange={(e) => {setDeckName(e.target.value)}}/>
                <div>
                    <label style={{fontWeight: 'bold'}}>Deck Image: </label>
                    <input 
                        type="file" accept=".jpg, .jpeg, .png" 
                        id="img-field"
                        onChange={async (e) => {
                            setDeckImageFile(e.target.files[0])
                            const {handleUploadImageEvent} = await import('./utils/uploadImage')
                            handleUploadImageEvent(e.target.files, setDeckImage, setDeckImageName)
                        }}
                    />
                </div>
            </div>
        </SettingsGroupItem>
    )
}