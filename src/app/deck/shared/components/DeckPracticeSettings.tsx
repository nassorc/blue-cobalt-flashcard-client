import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { InputSm } from "../../../../lib/styled/Input.styled";
import Input from "./Input/Input";

const styles = {
  split: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.6rem",
  },
  form: {
    width: "400px",
  },
  fieldHeader: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
};

export default function DeckPracticeSettings({ deck, dispatch, ACTIONS }) {
  return (
    <div style={styles.form}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={styles.split}>
          <label style={{ fontWeight: "bold" }}>new cards:</label>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ color: "rgba(0,0,0,0.7)" }}
          />
        </div>
        <Input
          type="input"
          value={deck?.newCardCount}
          onChange={(e) => {
            dispatch({
              type: ACTIONS.UPDATE_DECK,
              payload: { newCardCount: e.target.value },
            });
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={styles.split}>
          <label style={{ fontWeight: "bold" }}>reviewed cards:</label>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ color: "rgba(0,0,0,0.7)" }}
          />
        </div>
        <Input
          type="input"
          value={deck?.reviewedCardCount}
          onChange={(e) => {
            dispatch({
              type: ACTIONS.UPDATE_DECK,
              payload: { reviewedCardCount: e.target.value },
            });
          }}
        />
      </div>
    </div>
  );
}
