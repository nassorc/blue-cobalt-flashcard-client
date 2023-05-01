import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../shared/context/AuthContext';
import useEditableDeck from "../../shared/hooks/useEditableDeck"
import { PageContainer, PageHeader } from "../../shared/styled/Container.styled"
import { ButtonSm } from '../../shared/styled/Button.styled';
import DeckInformationSettings from '../shared/components/DeckInformationSettings';
import DeckPracticeSettings from '../shared/components/DeckPracticeSettings';
import DeckCardlistSettings from '../shared/components/DeckCardlistSettings';

import styled from 'styled-components'

const SettingsLink = styled.a`
    color: black;
`
function SettingsNavbar() {

    return(
        <div style={{width: '100%', borderBottom: '2px solid black', marginBottom: '1rem'}}>
            <div style={{width: '400px', marginBottom: '0.5rem'}}>
                <SettingsLink href="#information-settings">
                    <li>Information</li>
                </SettingsLink>
                <SettingsLink href="#practice-settings">
                    <li>Practice</li>
                </SettingsLink>
                <SettingsLink href="#delete-deck">
                    <li>Delete</li>
                </SettingsLink>
                <SettingsLink href="#deck-list">
                    <li>DeckList</li>
                </SettingsLink>
            </div>
        </div>
    )
}

export default function AddDeckPage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    let [deck, originalDeck, dispatch, ACTIONS] = useEditableDeck();
    const handleSaveDeck = async (e) => {
        
    }
    const handleCancel = () => {
        navigate('/');
    }
    return(
        <PageContainer>
            <PageHeader>
                <h1>Deck Settings</h1>
                <div>
                    <SettingsNavbar />
                </div>
                <div>
                    <div>
                        <h4>Save changes?</h4>
                    </div>
                    <div>
                        <ButtonSm bg="white" color="var(--darkBlue-color)" borderColor="var(--shadow)" onClick={handleCancel} style={{marginRight: '4px'}}>Cancel</ButtonSm>
                        <ButtonSm bg="var(--blue-color)" color="white" borderColor="var(--darkBlue-color)" onClick={handleSaveDeck} style={{marginRight: '4px'}}>Add</ButtonSm>
                    </div>
                </div>
            </PageHeader>
            <DeckInformationSettings deck={deck} dispatch={dispatch} ACTIONS={ACTIONS}/>
        </PageContainer>
    )
}