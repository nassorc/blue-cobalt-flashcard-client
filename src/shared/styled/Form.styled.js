import styled from 'styled-components';

export const FormContainer = styled.section`
    margin-top: 3rem;
    margin-inline: auto;
    padding-block: 1rem;
    max-width: 380px;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`
export const FormAlert = styled.div`
  margin-block: 1rem;
  padding: 1.6rem 1rem;
  background-color: ${props => props.bg ? props.bg : 'rgb(245, 233, 196)'};
  border: 1px solid ${props => props.borderColor ? props.borderColor : 'rgb(237, 222, 175)'};
  border-radius: 4px;
  color: ${props => props.color ? props.color : 'black'};
`