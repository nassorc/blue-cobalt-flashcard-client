import styled from "styled-components";

export const Badge = styled.div`
  margin-right: 6px;
  padding: 2px 4px;
  display: inline-flex;
  align-items: center;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  pointer-events: none;
  user-select: none;
  z-index: 10;
  position: relative;

  & > *:not(:last-child) {
    margin-right: 2px;
  }
`;
