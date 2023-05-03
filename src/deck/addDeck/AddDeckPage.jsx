import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../shared/context/AuthContext';
import useEditableDeck from '../../shared/hooks/useEditableDeck';

// Settings Components
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle';
// Styled components
import { PageContainer } from "../../shared/styled/Container.styled";
import { ButtonCircle, ButtonSm } from '../../shared/styled/Button.styled';

import editStyles from '../shared/assets/deck.module.css'
import Deck from '../shared/components/Deck';
import { InputSm } from '../../shared/styled/Input.styled';

// import openai from 'openai'

// async function getFlashcards(question, temperature) {
//     const client = new openai(key);
//     const completion = await client.createCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [
//             {"role": "system", "content": "You are a consistent elementary teacher. Please make a formatted text database of ten reading comprehension questions you create based on my input. Your response will use the following JSON format:  [{front: \"question, possible answer 1, possible answer 2, possible answer 3, possible answer 4\", back: \"corect answer\"}, {front:\"..\", back: \"..\"}, ...]"},
//             {"role": "user", "content": question}
//             ],
//         temperature: temperature,
//     });
// }

export default function AddDeckPage() {
    const [isUploading, setUploading] = useState(false);

    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { deckId } = useParams();
    let [deck, originalDeck, dispatch, ACTIONS] = useEditableDeck();

    const handleSaveDeck = async (e) => {
        setUploading(true);
        let imageURL = '';
        let blurhash;
        try {
            if(deck?.deckImageFile) {  // if user upload an image
                if(originalDeck?.deckImage && originalDeck?.deckImageName?.length > 0) {  // delete current image
                    console.log('should be deleting')
                    const { deleteImage } = await import('../shared/core/deleteImage')
                    await deleteImage(originalDeck?.deckImageName)
                }
                const {uploadImage} = await import('../shared/core/uploadImage');  // upload to firebase
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
            const { saveToDatabase } = await import('../shared/core/saveToDatabase');
            let res = await saveToDatabase(updatedDeck, deckId, {'Authorization': `Bearer ${authContext.auth.token}`});
            if (res) navigate('/');
            else throw new Error('Could not save deck to database')
        }
        catch(err) {
            setUploading(false);
            console.log(err.message)
        }
    }

    const handleCancel = () => {
        navigate('/');
    }
    return(
        <PageContainer>
            {
                (isUploading)
                ?
                <div style={
                    {
                        width: '400px', 
                        display: 'inline-grid', 
                        placeItems: 'center', 
                        marginInline: 'auto', 
                        position: 'absolute', 
                        left: '50%', 
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }> 
                    <p style={{fontSize: '28px', marginBottom: '1rem'}}>Uploading your deck.</p>
                    <BarLoader color="lightcoral" width="100%"/>
                </div>
                :
                <>
                    <div className={`${editStyles.split}`}>
                        <h1>Create deck?</h1>
                        <div>
                            <ButtonSm bg="white" color="var(--darkBlue-color)" borderColor="var(--shadow)" onClick={handleCancel} style={{marginRight: '4px'}}>Cancel</ButtonSm>
                            <ButtonSm bg="var(--blue-color)" color="white" borderColor="var(--darkBlue-color)" onClick={handleSaveDeck} style={{marginRight: '4px'}}>Create</ButtonSm>
                        </div>
                        
                    </div>

                    <div>
                        <h3>customize deck</h3>
                        <div className={`${editStyles.split}`} >
                            <div style={{flexBasis: '380px', padding: '1rem'}}>
                                <Deck deck={deck} removeButtons={1}/>
                            </div>
                            <div style={{flexGrow: '1'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>Deck Name</label>
                                    <InputSm />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>Image</label>
                                    <input type="file" name="" id="" />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>New cards</label>
                                    <InputSm />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>Reviewed cards</label>
                                    <InputSm />
                                </div>
                                <div>
                                    <label>Public</label>
                                    <Toggle
                                        checked={true}
                                        name='burritoIsReady'
                                        value='yes'
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Auto Deck Builder</h3>
                        <p>Got some large text? Let us build the deck for you!</p>
                        <div style={{width: '90%', margin: '0 auto'}}>
                            <textarea 
                                placeholder="Enter Text"
                                style={{width: '100%', padding:'1.4rem', fontSize: "1.1rem", lineHeight: '1.4', resize: 'none'}}></textarea>
                        </div>
                        <div>
                            <div style={{width: '90%', margin: '0 auto', display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                                    <label>Front</label>
                                    <InputSm />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                                    <label>Back</label>
                                    <InputSm />
                                </div>
                            
                            </div>
                            <ButtonCircle style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                            <FontAwesomeIcon icon={faPlus} />

                            </ButtonCircle>

                        </div>

                        <div>
                            Front
                            back
                        </div>
                    </div>
                </>
            }
            

        </PageContainer>
    )
}