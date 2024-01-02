import styled from "styled-components";

export const Group = styled.div`
  box-sizing: border-box;
  margin: 4px 4px;
  padding: 8px 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 0px 1px
    ${(props) => (props.shadow ? "rgba(0, 0, 0, 0.2)" : "white")};
  border-radius: 4px;
`;
