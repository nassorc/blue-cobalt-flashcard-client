import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { InputSm } from "../../../shared/styled/Input.styled";
import Input from "./Input/Input";
import { ButtonMd } from "../../../shared/styled/Button.styled";

export function InputCard({ dispatch, ACTIONS }) {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const handleAdd = (e) => {
        const newCard = {
            front,
            back,
        };
        dispatch({
            type: ACTIONS.ADD_CARD,
            payload: { updatedCard: { front, back } },
        });

        setFront("");
        setBack("");
    };
    return (
        <div>
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <label htmlFor="front" style={{ fontWeight: "bold" }}>
                            Front
                        </label>
                        <FontAwesomeIcon
                            icon={faCircleInfo}
                            style={{ color: "rgba(0,0,0,0.7)" }}
                        />
                    </div>
                    <Input
                        type="input"
                        value={front}
                        onChange={(e) => {
                            setFront(e.target.value);
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <label htmlFor="back" style={{ fontWeight: "bold" }}>
                            Back
                        </label>
                        <FontAwesomeIcon
                            icon={faCircleInfo}
                            style={{ color: "rgba(0,0,0,0.7)" }}
                        />
                    </div>
                    <Input
                        type="input"
                        value={back}
                        onChange={(e) => {
                            setBack(e.target.value);
                        }}
                    />
                </div>

                <ButtonMd
                    className="mt-2"
                    onClick={handleAdd}
                    style={{ width: "100%" }}
                >
                    Add
                </ButtonMd>
            </div>
        </div>
    );
}
