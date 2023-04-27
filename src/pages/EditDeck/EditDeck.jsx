import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useEditableDeck from '../../common/hooks/useEditableDeck';

// Settings Components
import DeckInformationSettings from '../../common/components/DeckInformationSettings';
import DeckPracticeSettings from '../../common/components/DeckPracticeSettings';
import DeckDeleteSettings from '../../common/components/DeckDeleteSettings';
import DeckCardlistSettings from '../../common/components/DeckCardlistSettings';


// Styled components
import { PageContainer } from '../../common/components/styled/Container.styled';
import { SettingsGroup } from './components/styled/SettingsGroup.styled';
import {SettingsGroupItem} from './components/styled/SettingsGroupItem.styled'

export default function EditDeckPage() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { deckId } = useParams();
    let setDeck;
    let [deck, originalDeck, dispatch, ACTIONS] = useEditableDeck(true, deckId, {'Authorization': `Bearer ${authContext.auth.token}`});
    const handleSaveDeck = async (e) => {
        console.log(deck?.deckImageFile)
        let imageURL = '';
        let blurhash;
        try {
            if(deck?.deckImageFile) {  // if user upload an image
                console.log(originalDeck?.deckImage)
                console.log(originalDeck?.deckImageName)
                if(originalDeck?.deckImage && originalDeck?.deckImageName?.length > 0) {  // delete current image
                    console.log('should be deleting')
                    const { deleteImage } = await import('../../common/core/deleteImage')
                    await deleteImage(originalDeck?.deckImageName)
                }
                const {uploadImage} = await import('../../common/core/uploadImage');  // upload to firebase
                imageURL = await uploadImage(deck?.deckImageName, deck?.deckImageFile);  // create image url to the image 

                // blurhash
                const { encodeImageToBlurhash } = await import('../../utils/encodeImageToBlurhash');
                blurhash = await encodeImageToBlurhash(deck?.deckImage)
            }
            const updatedDeck = {
                deckName: deck?.deckName,
                deckImage: (imageURL) ? imageURL : deck?.deckImage || '',
                deckImageName: (deck?.deckImageName) ? deck?.deckImageName : originalDeck?.deckImageName || '',
                blurhash: blurhash,
                cards: deck?.modifiedCards,
                deckSettings: {
                    reviewCards: deck?.reviewedCardCount,
                    newCards: deck?.newCardCount
                }
            }
            // save to database
            const { saveToDatabase } = await import('../../common/core/saveToDatabase');
            let res = await saveToDatabase(updatedDeck, deckId, {'Authorization': `Bearer ${authContext.auth.token}`});
            if (res) navigate('/');
            else throw new Error('Could not save deck to database')
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const handleCancel = () => {
        navigate('/');
    }
    return(
        <PageContainer>
            <SettingsGroup style={{marginBottom: '1.2rem', justifyContent: 'space-between'}}>
                <div>
                    <h1>Edit Deck</h1>
                    <p>Edit deck and click the save button to save any changes.</p>
                </div>
                <div>
                    <button onClick={handleSaveDeck} style={{marginRight: '4px'}}>Save</button>
                    <button onClick={handleCancel} style={{marginRight: '4px'}}>Cancel</button>
                </div>
            </SettingsGroup>

            <SettingsGroup>
                    <SettingsGroupItem>
                        <DeckInformationSettings deck={deck} dispatch={dispatch} ACTIONS={ACTIONS}/>
                    </SettingsGroupItem>
            </SettingsGroup>

            <SettingsGroup>
                <h3>Deck review session settings</h3>
            </SettingsGroup>

            <SettingsGroup>
                <DeckPracticeSettings deck={deck} dispatch={dispatch} ACTIONS={ACTIONS}/>
            </SettingsGroup>

            <SettingsGroup>
                <DeckDeleteSettings deckId={deckId} />
            </SettingsGroup>

            <SettingsGroup style={{flexDirection: 'column'}}>
                <h3>Modify Flashcards</h3>
                <p>Add, Edit, or Remove cards from the deck</p>
            </SettingsGroup>

            <SettingsGroup >
                <DeckCardlistSettings deck={deck} dispatch={dispatch} ACTIONS={ACTIONS}/>
            </SettingsGroup>

        </PageContainer>
    )
}