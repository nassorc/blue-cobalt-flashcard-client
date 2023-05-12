import ImageIcon from "./ImageIcon";
import { InputSm } from "../../../shared/styled/Input.styled";
import deckStyles from "../assets/deck.module.css";
import Input from "./Input/Input";

export default function DeckInformationSettings({ deck, dispatch, ACTIONS }) {
    return (
        <div className={deckStyles["split"]}>
            <ImageIcon image={deck?.deckImage} />
            <div className={deckStyles.ml2}>
                <label style={{ fontWeight: "bold" }}>Deck name: </label>
                <Input
                    value={deck?.deckName}
                    onChange={(e) => {
                        dispatch({
                            type: ACTIONS.UPDATE_DECK,
                            payload: { deckName: e.target.value },
                        });
                    }}
                />

                <div>
                    <label style={{ fontWeight: "bold" }}>Deck Image: </label>
                    <Input
                        style={{ width: "220px" }}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        id="img-field"
                        onChange={async (e) => {
                            const { handleUploadImageEvent } = await import(
                                "../../../utils/uploadImage"
                            );
                            handleUploadImageEvent(e.target.files, (deckInformation) => {
                                console.log(deckInformation);
                                const payload = {
                                    deckImageFile: deckInformation.file,
                                    deckImageName: deckInformation.fileName,
                                    deckImage: deckInformation.url,
                                };
                                dispatch({
                                    type: ACTIONS.UPDATE_DECK,
                                    payload: { ...payload },
                                });
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
