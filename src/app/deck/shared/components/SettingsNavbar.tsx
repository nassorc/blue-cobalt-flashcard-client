import styled from "styled-components";
import deckStyles from "../assets/deck.module.css";
const SettingsLink = styled.a`
  color: black;
`;
export default function SettingsNavbar() {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: "2px solid black",
        marginBottom: "1rem",
      }}
    >
      <div
        className={deckStyles["split"]}
        style={{ width: "400px", marginBottom: "0.5rem" }}
      >
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
  );
}
