import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../common/hooks/useFetchData';
import AuthContext from '../../context/AuthContext';
import { GET_DECK_ENDPOINT } from '../../utils/api'

// Components
import Card from './components/Card';
import ImageIcon from './components/ImageIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// Styled Comonents
import InputCard from './components/InputCard';
import {InputSm} from '../../common/components/styled/Input.styled'

import { PageContainer } from '../../common/components/styled/Container.styled';
import { SettingsGroup } from './components/styled/SettingsGroup.styled';
import { SettingsGroupItem } from './components/styled/SettingsGroupItem.styled';

export default function EditDeckPage() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const { deckId } = useParams();
    // fetch deck using url param
    const url =  `${process.env.REACT_APP_SERVER_BASE_URL}${GET_DECK_ENDPOINT(deckId)}`;
    const deck = useFetchData(url, {
        headers: {'Authorization': `Bearer ${authContext.auth.token}`}
    });

    // input data
    const [deckName, setDeckName] = useState('')                        // deck name
    const [newCardCount, setNewCardCount] = useState(0);                // number of type 'new' cards added to review session
    const [reviewedCardCount, setReviewedCardCount] = useState(0);      // number of type 'reviewed' cards added to review session
    const [deckImage, setDeckImage] = useState('');                     
    const [deckImageName, setDeckImageName] = useState('');             // deck image name. Used to query image in firebase storage.
    const [deckImageFile, setDeckImageFile] = useState('');             // image upload file
    const [modifiedCards, setModifiedCards] = useState([]);             // contains the modified card list

    // set intitial value of the fields when fetch returns data
    useEffect(() => {
        setDeckName(deck?.deckName)
        setNewCardCount(deck?.deckSettings?.newCards)
        setReviewedCardCount(deck?.deckSettings?.reviewCards)
        setModifiedCards(deck?.cards);
        setDeckImage(deck?.deckImage)
    }, [deck])

    // creates a list of cards
    let CardList = (modifiedCards)
        ? modifiedCards?.map(card => {
                return <Card id={card._id} front={card.front} back={card.back} setModifiedCards={setModifiedCards} key={card._id} />
            })
        : [];

    const handleSaveDeck = async (e) => {
        let imageURL = '';
        // if user uploaded an image
        try {
            if(deckImageFile) {  // upload to firebase
                if(deck?.deckImage && deck?.deckImageName) {
                    const { deleteImage } = await import('./core/deleteImage')
                    await deleteImage(deck?.deckImageName)
                }
                // upload to firebase
                const {uploadImage} = await import('./core/uploadImage');
                imageURL = await uploadImage(deckImageName, deckImageFile);            
            }
            const updatedDeck = {
                deckName,
                deckImage: (imageURL) ? imageURL : deck?.deckImage || '',
                deckImageName: (deckImageName) ? deckImageName : deckImageName || '',
                cards: modifiedCards,
                deckSettings: {
                    reviewCards: reviewedCardCount,
                    newCards: newCardCount
                }
            }
            // save to database
            const { saveToDatabase } = require('./core/saveToDatabase');
            let res = await saveToDatabase(updatedDeck, deckId, {'Authorization': `Bearer ${authContext.auth.token}`});
            if (res) navigate('/');
            else throw new Error('Could not save deck to database')
        }
        catch(err) {
            throw new Error(err.message)
        }
    }
    const handleDeleteDeck = async () => {
        // make delete request 
        const { deleteDeck } = import('./core/deleteDeck');
        deleteDeck(deckId, {'Authorization': `Bearer ${authContext.auth.token}`})
        navigate('/');
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
            </SettingsGroup>
            <SettingsGroup>
                <h3>Deck review session settings</h3>
            </SettingsGroup>
            <SettingsGroup>
                <div>
                    <p>Number of cards added each review session</p>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <label style={{fontWeight: 'bold'}}>new cards:</label>
                            <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                        </div>
                        <InputSm type="input" value={newCardCount} onChange={(e) => {
                            setNewCardCount(e.target.value)
                        }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <label style={{fontWeight: 'bold'}}>reviewed cards:</label>
                            <FontAwesomeIcon icon={faCircleInfo} style={{color: 'rgba(0,0,0,0.7)'}}/>
                        </div>
                        <InputSm type="input" value={reviewedCardCount} onChange={(e) => {
                        setReviewedCardCount(e.target.value)
                        }}/>
                    </div>
                </div>
                
            </SettingsGroup>
            <SettingsGroup>
                <div>
                    <h3>Delete deck</h3>
                    <p>By deleting this deck, you will lose all the cards of this deck.</p>
                </div>
                <div>
                    <button>Delete deck</button>
                </div>
            </SettingsGroup>
            
            <SettingsGroup style={{flexDirection: 'column'}}>
                <h3>Modify Flashcards</h3>
                <p>Add, Edit, or Remove cards from the deck</p>
            </SettingsGroup>
            <SettingsGroup >
                <div style={{width: '100%'}}>
                    <InputCard setModifiedCards={setModifiedCards}/>
                    {CardList}
                </div>
            </SettingsGroup>
        </PageContainer>
    )
}