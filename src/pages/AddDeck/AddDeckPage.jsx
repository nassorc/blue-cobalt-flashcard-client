import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import useEditableDeck from "../../common/hooks/useEditableDeck"
import { PageContainer } from "../../common/components/styled/Container.styled"

import DeckInformationSettings from '../../common/components/DeckInformationSettings';
import DeckPracticeSettings from '../../common/components/DeckPracticeSettings';
import DeckCardlistSettings from '../../common/components/DeckCardlistSettings';

import styled from 'styled-components'

const PageContent = styled.section`
    width: ${props => props?.width ? props?.width : '100%'};
`
const SplitContent = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props?.gap ? props?.gap: '1rem'}

`

export default function AddDeckPage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [deck, setDeck, originalDeck] = useEditableDeck();
    const handleSaveDeck = async (e) => {
        let imageURL = '';
        let blurhash;
        try {
            if(deck?.deckImageFile) {  // if user upload an image
                if(originalDeck?.deckImage && originalDeck?.deckImageName) {  // delete current image
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
            let res = await saveToDatabase(updatedDeck, null, {'Authorization': `Bearer ${authContext.auth.token}`});
            console.log(res)
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
            <PageContent>
                <div>
                    <h2>Add deck</h2>
                    <p>Add new flashcard deck</p>
                </div>
                <div>
                    <button onClick={handleSaveDeck} style={{marginRight: '4px'}}>Save</button>
                    <button onClick={handleCancel} style={{marginRight: '4px'}}>Cancel</button>
                </div>
            </PageContent>
            
            <PageContent>
                <SplitContent gap={'1rem'}>
                    <DeckInformationSettings deck={deck} setDeck={setDeck} />
                </SplitContent>
            </PageContent>

            <PageContent>
                <div>
                    <h3>Auto Deck builder</h3>
                    <p>Enter text and we will generate the flashcards for you.</p>
                </div>

                <textarea></textarea>
                <div>
                    <button>Generate</button>
                </div>
            </PageContent>

            <PageContent width="20rem">
                <DeckPracticeSettings deck={deck} setDeck={setDeck} />
            </PageContent>
            <PageContent>
                <DeckCardlistSettings deck={deck} setDeck={setDeck} />
            </PageContent>
        </PageContainer>
    )
}