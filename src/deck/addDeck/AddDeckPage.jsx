import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../shared/context/AuthContext";
import useEditableDeck from "../../shared/hooks/useEditableDeck";

// Settings Components
import { BarLoader, MoonLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Toggle from "react-toggle";
// Styled components
import { PageContainer } from "../../shared/styled/Container.styled";
import {
    Button,
    ButtonCircle,
    ButtonMd,
    ButtonSm,
} from "../../shared/styled/Button.styled";

import editStyles from "../shared/assets/deck.module.css";
import Deck from "../shared/components/Deck";
import { InputSm } from "../../shared/styled/Input.styled";
import generateFlashcards from "../shared/core/generateFlashcards";

import DeckCardlistSettings from "../shared/components/DeckCardlistSettings";
import Input from "../shared/components/Input/Input";

import BackgroundImage from "/website-bg.jpg";
import FormLabel from "../shared/components/Form/FormLabel";

function EditableCard(props) {
    const { front, setFront, back, setBack } = props;
    return (
        <div className="w-full">
            <div className="flex justify-end">
                <ButtonSm>Delete</ButtonSm>
            </div>
            <div className="flex justify-between items-center">
                <label className="mr-4">Front</label>
                <input
                    className="my-2 py-3 px-4 border border-black/40 rounded-md grow"
                    value={front}
                    onChange={(e) => {
                        setFront(e.target.value);
                    }}
                />
            </div>

            <div className="flex items-center">
                <label className="mr-4">Back</label>
                <input
                    className="my-2 py-3 px-4 border border-black/40 rounded-md grow"
                    value={back}
                    onChange={(e) => {
                        setBack(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
export default function AddDeckPage() {
    const [isUploading, setUploading] = useState(false);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { deckId } = useParams();
    let [deck, originalDeck, dispatch, ACTIONS] = useEditableDeck();

    // radio button
    const [selectedRadioBtn, setSelectedRadioBtn] = useState("private");
    const isRadioSelected = (value) => selectedRadioBtn === value; // if button value equals state value, return true. This checks the button
    const handleRadioEvent = (e) => {
        setSelectedRadioBtn(e.target.value);
    };

    const [front, setFront] = useState("hello"); // New flashcard front input field
    const [back, setBack] = useState(""); // New flashcard back input field
    const [buildDeckField, setBuildDeckField] = useState(""); // text area value to auto build deck
    const handleSaveDeck = async (e) => {
        setUploading(true);
        let imageURL = "";
        let blurhash;
        try {
            if (deck?.deckImageFile) {
                // if users uploads and image.
                // 1. Delete current image, if any.
                // 2. upload new image to firebase.
                // 3. create downloadURL from image uploaded to firebase.
                // 5. Save url to database
                if (
                    originalDeck?.deckImage &&
                    originalDeck?.deckImageName?.length > 0
                ) {
                    // delete current image
                    const { deleteImage } = await import("../shared/core/deleteImage");
                    await deleteImage(originalDeck?.deckImageName);
                }
                const { uploadImage } = await import("../shared/core/uploadImage"); // upload to firebase
                imageURL = await uploadImage(deck?.deckImageName, deck?.deckImageFile); // create image url to the image

                // blurhash
                const { encodeImageToBlurhash } = await import(
                    "../../utils/encodeImageToBlurhash"
                );
                blurhash = await encodeImageToBlurhash(deck?.deckImage);
            }
            const updatedDeck = {
                deckName: deck?.deckName,
                deckImage: imageURL ? imageURL : deck?.deckImage || "",
                deckImageName: deck?.deckImageName
                    ? deck?.deckImageName
                    : originalDeck?.deckImageName || "",
                blurhash: blurhash,
                cards: deck?.modifiedCards,
                deckSettings: {
                    reviewCards: deck?.reviewedCardCount,
                    newCards: deck?.newCardCount,
                    visibility: selectedRadioBtn,
                },
            };
            // save to database
            const { saveToDatabase } = await import("../shared/core/saveToDatabase");
            let res = await saveToDatabase(updatedDeck, deckId, {
                Authorization: `Bearer ${authContext.auth.token}`,
            });
            if (res) navigate("/");
            else throw new Error("Could not save deck to database");
        } catch (err) {
            setUploading(false);
            console.log(err.message);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <PageContainer>
            {isUploading ? (
                <div
                    style={{
                        width: "400px",
                        display: "inline-grid",
                        placeItems: "center",
                        marginInline: "auto",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <p style={{ fontSize: "28px", marginBottom: "1rem" }}>Creating...</p>
                    <BarLoader color="lightcoral" width="100%" />
                </div>
            ) : (
                <>
                    <div
                        className="px-4 py-8 bg-cover bg-left-bottom bg-no-repeat text-white rounded-lg"
                        style={{
                            backgroundPosition: "80% 90%",
                            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${BackgroundImage})`,
                        }}
                    >
                        <div className="flex justify-between">
                            <h1 className="pl-4 text-2xl font-bold border-l-4 border-green-400">
                                Create Deck
                            </h1>
                            <div>
                                <ButtonMd
                                    bg="white"
                                    color="var(--darkBlue-color)"
                                    borderColor="var(--shadow)"
                                    onClick={handleCancel}
                                    style={{ marginRight: "10px" }}
                                >
                                    Cancel
                                </ButtonMd>
                                <ButtonMd
                                    bg="var(--blue-color)"
                                    color="white"
                                    borderColor="var(--darkBlue-color)"
                                    onClick={handleSaveDeck}
                                >
                                    Create
                                </ButtonMd>
                            </div>
                        </div>
                    </div>
                    <div className="py-8 px-16">
                        <div>
                            {/* <div className="mb-8 [&>*]:mb-4"> */}
                            {/*     <p className="text-slate-600 font-semibold w-full block border-b border-slate-600"> */}
                            {/*         Preview */}
                            {/*     </p> */}
                            {/**/}
                            {/*     <div className="w-[380px] mx-auto"> */}
                            {/*         <Deck deck={deck} removeButtons={1} /> */}
                            {/*     </div> */}
                            {/* </div> */}
                            <div>
                                <div className="flex flex-col">
                                    <FormLabel text="Deck Information" />
                                    <label>Deck Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Chapter 1 cards"
                                        value={deck?.deckName}
                                        onChange={(e) => {
                                            dispatch({
                                                type: ACTIONS.UPDATE_DECK,
                                                payload: { deckName: e.target.value },
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-8 flex justify-between items-center [&>*]:mr-2">
                                    <label>Image</label>
                                    <Input
                                        type="file"
                                        name=""
                                        id=""
                                        accept=".jpg, .jpeg, .png"
                                        onChange={async (e) => {
                                            const { handleUploadImageEvent } = await import(
                                                "../../utils/uploadImage"
                                            );
                                            handleUploadImageEvent(
                                                e.target.files,
                                                (deckInformation) => {
                                                    dispatch({
                                                        type: ACTIONS.UPDATE_DECK,
                                                        payload: { ...deckInformation },
                                                    });
                                                }
                                            );
                                        }}
                                    />
                                </div>
                                <div className="mb-8 [&>p]:mb-4 [&>input]:mb-4 flex flex-col ">
                                    <FormLabel text="Practice Settings" />
                                    <div className="flex justify-between items-center [&>*]:mr-2">
                                        <label>New cards</label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={deck?.newCardCount}
                                            onChange={(e) => {
                                                dispatch({
                                                    type: ACTIONS.UPDATE_DECK,
                                                    payload: { newCardCount: e.target.value },
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center [&>*]:mr-2">
                                        <label>Reviewed cards</label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={deck?.reviewedCardCount}
                                            onChange={(e) => {
                                                dispatch({
                                                    type: ACTIONS.UPDATE_DECK,
                                                    payload: { reviewedCardCount: e.target.value },
                                                });
                                            }}
                                        />
                                    </div>
                                    <p className="text-black/90">
                                        This affects the number of cards added to the practice
                                        session.
                                    </p>
                                </div>
                                <div className="[&>*]:mb-4 [&>label]:mr-6 [&>input]:mr-2">
                                    <FormLabel text="Visibility Status" />
                                    <input
                                        type="radio"
                                        value="private"
                                        checked={isRadioSelected("private")}
                                        onChange={handleRadioEvent}
                                        name="Visibility-group"
                                    />
                                    <label>Private</label>
                                    <input
                                        type="radio"
                                        value="public"
                                        checked={isRadioSelected("public")}
                                        onChange={handleRadioEvent}
                                        name="Visibility-group"
                                    />
                                    <label>Public</label>
                                    <p className="text-black/90">
                                        Private decks are only visible to its owner.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="py-8 px-16 [&>*]:mb-4">
                            <FormLabel
                                text="Auto Deck Builder"
                                desc="Got some large text or prompt? Let us build the deck for you!"
                            />
                            <textarea
                                placeholder="Enter Text"
                                className="mb-4 p-5 w-full h-[300px] text-lg resize-none leading-5 border border-black/60 rounded-md"
                                value={buildDeckField}
                                onChange={(e) => {
                                    setBuildDeckField(e.target.value);
                                }}
                            ></textarea>
                            <Button
                                style={{ width: "100%" }}
                                onClick={async (e) => {
                                    // auto generate deck
                                    setUploading(true);
                                    const generatedCards = await generateFlashcards(
                                        buildDeckField,
                                        0.6
                                    );
                                    // update modified deck
                                    if (!generatedCards || generatedCards?.length < 1) {
                                        console.log("Something went wrong");
                                    } else {
                                        dispatch({
                                            type: ACTIONS.ADD_CARDS,
                                            payload: { newCards: generatedCards },
                                        });
                                    }
                                    setUploading(false);
                                }}
                            >
                                Generate flashcards
                            </Button>
                        </div>
                        <div className="py-8 px-16 [&>*]:mb-4">
                            <FormLabel text="Add Card" />
                            <DeckCardlistSettings
                                deck={deck}
                                dispatch={dispatch}
                                ACTIONS={ACTIONS}
                            />
                            {/* <div className="flex flex-col"> */}
                            {/*     <div */}
                            {/*         style={{ */}
                            {/*             display: "flex", */}
                            {/*             flexDirection: "column", */}
                            {/*             flexGrow: "1", */}
                            {/*         }} */}
                            {/*     > */}
                            {/*         <label>Front</label> */}
                            {/*         <Input */}
                            {/*             value={front} */}
                            {/*             onChange={(e) => { */}
                            {/*                 setFront(e.target.value); */}
                            {/*             }} */}
                            {/*         /> */}
                            {/*     </div> */}
                            {/*     <div */}
                            {/*         style={{ */}
                            {/*             display: "flex", */}
                            {/*             flexDirection: "column", */}
                            {/*             flexGrow: "1", */}
                            {/*         }} */}
                            {/*     > */}
                            {/*         <label>Back</label> */}
                            {/*         <Input */}
                            {/*             value={back} */}
                            {/*             onChange={(e) => { */}
                            {/*                 setBack(e.target.value); */}
                            {/*             }} */}
                            {/*         /> */}
                            {/*     </div> */}
                            {/* </div> */}
                            {/* <Button style={{ width: "100%" }}>Add</Button> */}
                            {/**/}
                            {/* <div> */}
                            {/*     <EditableCard /> */}
                            {/* </div> */}
                        </div>
                    </div>
                </>
            )}
        </PageContainer>
    );
}
