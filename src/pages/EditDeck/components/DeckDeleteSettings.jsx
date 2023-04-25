import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function DeckDeleteSettings({}) {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();

    const handleDeleteDeck = async ({ deckId }) => {
        // make delete request 
        const { deleteDeck } = import('../core/deleteDeck');
        deleteDeck(deckId, {'Authorization': `Bearer ${authContext.auth.token}`})
        navigate('/');
    }
    return(
        <>
            <div>
                <h3>Delete deck</h3>
                <p>By deleting this deck, you will lose all the cards of this deck.</p>
            </div>
            <div>
                <button>Delete deck</button>
            </div>
        </>
    )
}