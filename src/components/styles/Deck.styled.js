import styled from 'styled-components';

export const DeckCard = styled.div`
    position: relative;

    background-position: top;
    background-repeat: no-repeat;
    background-size: contain;
    box-sizing: border-box;
    padding-top: 100px;
    margin-block: 20px;

    width: 300px;
    background-color: white;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
    // -webkit-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
    // -moz-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    transition: 400ms;

    & > div {
        background-color: white;
        padding: 12px 16px 16px 16px;
    }
    &:hover {
        box-shadow: 0px 4px 0px 4px rgba(0, 0, 0, 0.2);

    }
` 