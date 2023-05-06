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
import { Button, ButtonCircle, ButtonMd, ButtonSm } from '../../shared/styled/Button.styled';

import editStyles from '../shared/assets/deck.module.css'
import Deck from '../shared/components/Deck';
import { InputSm } from '../../shared/styled/Input.styled';
import { Configuration, OpenAIApi } from 'openai'
import { GreaterEqualDepth } from 'three';

async function generateFlashcards(prompt, temperature) {
    try { 
        // create config
        const configuration = new Configuration({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY
        })
        // create instance of openai
        const openai = new OpenAIApi(configuration);
        // send request
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a consistent teacher. You can create flashcards from the information I provide. Please make a formatted text database of ten flashcards you create based on my input. Your response will use the following JSON format:  [{front: \"question, possible answer 1, possible answer 2, possible answer 3, possible answer 4\", back: \"corect answer\"}, {front:\"..\", back: \"..\"}, ...]"},
                {"role": "user", "content": prompt}
                ],
            temperature: temperature,
        })
        // extract data
        const data = res?.data?.choices[0].message.content;
        return JSON.parse(data);
    }
    catch(error) {
        console.log(error.message)
    }
}

const Card = (front, back) => {
    return(
        <div>
            <div>
                <ButtonSm>Delete</ButtonSm>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                <label>Front</label>
                <InputSm />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                <label>Back</label>
                <InputSm />
            </div>
        </div>
    )
}

export default function AddDeckPage() {
    const [isUploading, setUploading] = useState(false);
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { deckId } = useParams();
    let [deck, originalDeck, dispatch, ACTIONS] = useEditableDeck();
    
    const [front, setFront] = useState('hello');  // New flashcard front input field
    const [back, setBack] = useState('');  // New flashcard back input field
    const [buildDeckField, setBuildDeckField] = useState('');  // text area value to auto build deck  
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
                        <h1>Create deck</h1>
                        <div>
                            <ButtonMd bg="white" color="var(--darkBlue-color)" borderColor="var(--shadow)" onClick={handleCancel} style={{marginRight: '10px'}}>Cancel</ButtonMd>
                            <ButtonMd bg="var(--blue-color)" color="white" borderColor="var(--darkBlue-color)" onClick={handleSaveDeck} >Create</ButtonMd>
                        </div>
                    </div>

                    <div>
                        <div className={`${editStyles.split}`} style={{marginTop: '1rem'}} >
                            <div style={{flexBasis: '380px', padding: '1rem'}}>
                                <Deck deck={deck} removeButtons={1}/>
                            </div>
                            <div style={{flexGrow: '1', padding: '1rem 1rem'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>Deck Name</label>
                                    <InputSm value={deck?.deckName} onChange={(e) => {dispatch( { type: ACTIONS.UPDATE_DECK, payload: {deckName: e.target.value} } )}}/>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>Image</label>
                                    <input 
                                        type="file" 
                                        name="" 
                                        id="" 
                                        accept=".jpg, .jpeg, .png"
                                        onChange={async (e) => {
                                            const { handleUploadImageEvent } = await import('../../utils/uploadImage');
                                            handleUploadImageEvent(e.target.files, (deckInformation) => {
                                                dispatch({ type: ACTIONS.UPDATE_DECK, payload: { ...deckInformation } })
                                            })
                                        }}
                                    />
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>New cards</label>
                                    <InputSm type='number' min='0' value={deck?.newCardCount} onChange={(e) => { dispatch({ type: ACTIONS.UPDATE_DECK, payload: {newCardCount: e.target.value} }) }}/>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label>Reviewed cards</label>
                                    <InputSm type='number' min='0' value={deck?.reviewedCardCount} onChange={(e) => { dispatch({ type: ACTIONS.UPDATE_DECK, payload: { reviewedCardCount: e.target.value } }) }}/>
                                </div>
                                <div>
                                    <label className="text-red-500">Visibility Status</label>
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
                        <div style={{marginBottom: '2rem'}}>
                            <h3>Auto Deck Builder</h3>
                            <p>Got some large text? Let us build the deck for you!</p>
                        </div>
                        <div style={{width: '90%', margin: '0 auto'}}>
                            <textarea 
                                placeholder="Enter Text"
                                style={{width: '100%', height: '300px', marginBottom: '1rem', padding:'1.4rem', fontSize: "1.1rem", lineHeight: '1.4', resize: 'none'}}
                                value={buildDeckField}
                                onChange={(e) => { setBuildDeckField(e.target.value) }}
                            ></textarea>
                            <Button 
                                style={{width: '100%'}}
                                onClick={async (e) => {
                                    // auto generate deck
                                    const generatedCards = await generateFlashcards(buildDeckField, 0.6)
                                    // update modified deck
                                    dispatch({ type: ACTIONS.ADD_CARDS, payload: { newCards: generatedCards }})
                                }}
                            >Generate flashcards</Button>
                        </div>
                        <div>
                            <h3>Add card</h3>
                        </div>
                        <div style={{width: '90%', margin: '0 auto'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                                    <label>Front</label>
                                    <InputSm value={front} onChange={(e) => { setFront(e.target.value) }}/>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                                    <label>Back</label> 
                                    <InputSm value={back} onChange={(e) => { setBack(e.target.value) }}/>
                                </div>
                            
                            </div>
                            <Button style={{width: '100%'}}>Add</Button>

                            <div>
                                <div>
                                    <div>
                                        <ButtonSm>Delete</ButtonSm>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                                        <label>Front</label>
                                        <InputSm />
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                                        <label>Back</label>
                                        <InputSm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            

        </PageContainer>
    )
}