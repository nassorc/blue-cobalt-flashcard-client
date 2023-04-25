import styled from 'styled-components';

export const FlashcardContainer = styled.div`
    position: relative;
    width: 600px;
`

export const Flashcard = styled.div`
    box-sizing: border-box;
    position: absolute;
    transform-style: preserve-3d;  // children are positioned in 3d space
    transition: all 500ms ease;
    width: 100%;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    transform-origin: center;

    ${(props) => props.rotate && `
        transform: rotateY(${props.rotate}deg);
    `}
`
export const Front = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;  // hides back face element when flipped
`

export const Back = styled(Front)`
    transform: rotateY(180deg);
`