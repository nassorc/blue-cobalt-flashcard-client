import styled from 'styled-components';

export const Button = styled.button`
    --primary-color: rgb(35,35,35);
    --secondary-color: rgb(196, 53, 37);
    appearance: none;
    border: none;
    background-color: ${props => props.bg ? props.bg : 'white'};
    padding-block: 0.8rem;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid ${props => props.borderColor ? props.borderColor : 'black'};
    color: ${props => props.color ? props.color : 'black'};

    &:hover {
        opacity: 90%;
    }
`
export const ButtonSm = styled(Button)`
    padding: 3px 8px;
`