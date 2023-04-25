import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useEditableDeck from '../../common/hooks/useEditableDeck';

// Settings Components
import DeckInformationSettings from './components/DeckInformationSettings';
import DeckPracticeSettings from './components/DeckPracticeSettings';
import DeckCardlistSettings from './components/DeckCardlistSettings';
import DeckDeleteSettings from './components/DeckDeleteSettings';

// Styled components
import { PageContainer } from '../../common/components/styled/Container.styled';
import { SettingsGroup } from './components/styled/SettingsGroup.styled';


export default function EditDeckPage() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { deckId } = useParams();

    let [deck, setDeck, originalDeck] = useEditableDeck(true, deckId, {'Authorization': `Bearer ${authContext.auth.token}`});

    const handleSaveDeck = async (e) => {
        let imageURL = '';
        try {
            if(deck?.deckImageFile) {  // if user upload an image
                if(originalDeck?.deckImage && originalDeck?.deckImageName) {  // delete current image
                    const { deleteImage } = await import('./core/deleteImage')
                    await deleteImage(originalDeck?.deckImageName)
                }
                const {uploadImage} = await import('./core/uploadImage');  // upload to firebase
                imageURL = await uploadImage(deck?.deckImageName, deck?.deckImageFile);  // create image url to the image   
            }
            const updatedDeck = {
                deckName: deck?.deckName,
                deckImage: (imageURL) ? imageURL : deck?.deckImage || '',
                deckImageName: (deck?.deckImageName) ? deck?.deckImageName : originalDeck?.deckImageName || '',
                cards: deck?.modifiedCards,
                deckSettings: {
                    reviewCards: deck?.reviewedCardCount,
                    newCards: deck?.newCardCount
                }
            }
            // save to database
            const { saveToDatabase } = await import('./core/saveToDatabase');
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
                    <DeckInformationSettings deck={deck} setDeck={setDeck}/>
            </SettingsGroup>

            <SettingsGroup>
                <h3>Deck review session settings</h3>
            </SettingsGroup>

            <SettingsGroup>
                <DeckPracticeSettings deck={deck} setDeck={setDeck}/>
            </SettingsGroup>

            <SettingsGroup>
                <DeckDeleteSettings deckId={deckId} />
            </SettingsGroup>

            <SettingsGroup style={{flexDirection: 'column'}}>
                <h3>Modify Flashcards</h3>
                <p>Add, Edit, or Remove cards from the deck</p>
            </SettingsGroup>

            <SettingsGroup >
                <DeckCardlistSettings deck={deck} setDeck={setDeck}/>
            </SettingsGroup>

        </PageContainer>
    )
}