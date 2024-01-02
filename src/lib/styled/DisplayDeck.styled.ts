import styled from "styled-components";

// Display or showcase Flashcard deck.
export const DisplayDeck = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-height: 200px;
  min-height: 200px;
  height: 200px;
  background-color: white;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;

  transition: 400ms;

  &:hover {
    box-shadow: 0px 4px 0px 4px rgba(0, 0, 0, 0.2);
  }
`;
export const DisplayDeckGridContainer = styled.section`
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  gap: 1.4rem;
`;

export const DisplayDeckImageContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const DisplayDeckContent = styled.div`
  padding: 0.8rem 1rem;
  background-color: white;
  position: relative;
  z-index: 10;

  & > *:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;
