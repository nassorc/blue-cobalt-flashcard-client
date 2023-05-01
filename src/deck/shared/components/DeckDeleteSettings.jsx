import { useContext, useState } from 'react';
import AuthContext from '../../../shared/context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { ButtonSm, ButtonSquare } from '../../../shared/styled/Button.styled';
import styled from 'styled-components'
import { faLayerGroup, faGraduationCap, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BadgeComponent from './BadgeComponent';

const DialogContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 250px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 8px;

    & > * {
        padding: 1rem;
        border-bottom: 1px solid black;
    }
`

function Dialog({ deck, setShowDialog, handleDelete }) {
    const handleCloseDialog = () => {
        setShowDialog(false);
    }
    return (
        <>
        <div
            onClick={(e) => {handleCloseDialog()}}
            style={
                {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                }
            }
        /> 
            <DialogContainer>
                {/* top - informing user what is about to happen, x button
                    middle - deck info (name, amount of cards, amound of reviewed cards)
                    bottom - button informing user (Delete deck)
                */}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p>Delete <span>{deck?.deckName}</span></p>
                    <ButtonSquare onClick={(e) => { handleCloseDialog() }}><FontAwesomeIcon icon={faXmark} /></ButtonSquare>
                </div>

                <div style={{flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h3 style={{marginBottom: '1rem'}}>{deck?.deckName}</h3>
                    <div>
                        <BadgeComponent 
                            icon={<FontAwesomeIcon icon={faLayerGroup} style={{color: 'rgba(0, 0, 0, 0.7)'}} />}
                            info={deck?.modifiedCards?.length}
                        />
                        <BadgeComponent 
                            icon={<FontAwesomeIcon icon={faGraduationCap} style={{color: 'rgba(0, 0, 0, 0.7)'}}/>}
                            info={deck?.modifiedCards?.filter(card => card.status === 'reviewed').length}
                        />
                    </div>
                </div>

                <div >
                    <ButtonSm
                        onClick={(e) => { handleDelete() }}
                        style={{width: '100%'}}
                        bg="var(--red-color)"
                        color="white"
                    >
                        Delete Deck
                    </ButtonSm>
                </div>
            </DialogContainer>
        </>
    )
}

export default function DeckDeleteSettings({deck, deckId}) {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    const handleDeleteEvent= () => {
        setShowDialog(true);
    }
    const handleDelete = async () => {
        // make delete request 
        const { deleteDeck } = await import('../core/deleteDeck');
        await deleteDeck(deckId, {'Authorization': `Bearer ${authContext.auth.token}`})
        navigate('/');
    }
    console.log(showDialog)
    return(
        <>
            {
                showDialog ? <Dialog deck={deck} setShowDialog={setShowDialog} handleDelete={handleDelete}/> : null
            }
            <div>
                <ButtonSm
                    onClick={handleDeleteEvent}
                    color="var(--red-color)"
                >Delete deck</ButtonSm>
            </div>
        </>
    )
}