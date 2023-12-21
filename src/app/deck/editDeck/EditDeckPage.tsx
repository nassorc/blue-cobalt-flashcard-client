import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../lib/context/AuthContext";
import useEditableDeck from "../../../lib/hooks/useEditableDeck";

// Settings Components
import SettingsGroupContainer from "../shared/components/SettingsGroupContainer";
import SettingsNavbar from "../shared/components/SettingsNavbar";
import DeckInformationSettings from "../shared/components/DeckInformationSettings";
import DeckPracticeSettings from "../shared/components/DeckPracticeSettings";
import DeckDeleteSettings from "../shared/components/DeckDeleteSettings";
import DeckCardlistSettings from "../shared/components/DeckCardlistSettings";
import { BarLoader } from "react-spinners";

// Styled components
import {
  PageContainer,
  PageHeader,
} from "../../../lib/styled/Container.styled";
import { ButtonSm, ButtonMd } from "../../../lib/styled/Button.styled";

import editStyles from "../shared/assets/deck.module.css";

import BackgroundImage from "/website-bg.jpg";
import FormLabel from "../shared/components/Form/FormLabel";
export default function EditDeckPage() {
  const [isUploading, setUploading] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { deckId } = useParams();
  let [deck, originalDeck, dispatch, ACTIONS] = useEditableDeck(true, deckId, {
    Authorization: `Bearer ${authContext.auth.token}`,
  });

  const handleSaveDeck = async (e) => {
    setUploading(true);
    let imageURL = "";
    let blurhash;
    try {
      if (deck?.deckImageFile) {
        // if user upload an image
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
          "../../../lib/encodeImageToBlurhash"
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
          <p style={{ fontSize: "28px", marginBottom: "1rem" }}>
            Uploading your deck.
          </p>
          <BarLoader color="lightcoral" width="100%" />
        </div>
      ) : (
        <>
          <PageHeader>
            <div>
              <SettingsNavbar />
            </div>
            <div
              className="px-4 py-8 bg-no-repeat text-white rounded-lg"
              style={{
                backgroundSize: "150%",
                backgroundPosition: "60% 40%",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${BackgroundImage})`,
              }}
            >
              <div className="flex flex-col">
                <span className="font-bold text-2xl cursor-auto">
                  Deck Settings
                </span>

                <div className="flex justify-between items-center">
                  <div>
                    <h4>Save changes?</h4>
                    <p>
                      Edit deck and click the save button to save any changes.
                    </p>
                  </div>
                  <div>
                    <ButtonMd
                      bg="white"
                      color="var(--darkBlue-color)"
                      borderColor="var(--shadow)"
                      onClick={handleCancel}
                      style={{ marginRight: "4px" }}
                    >
                      Cancel
                    </ButtonMd>
                    <ButtonMd
                      bg="var(--blue-color)"
                      color="white"
                      borderColor="var(--darkBlue-color)"
                      onClick={handleSaveDeck}
                      style={{ marginRight: "4px" }}
                    >
                      Save changes
                    </ButtonMd>
                  </div>
                </div>
              </div>
            </div>
          </PageHeader>
          <div id="information-settings"></div>
          <FormLabel text="Deck Settings" />
          <SettingsGroupContainer title="Information Settings">
            <DeckInformationSettings
              deck={deck}
              dispatch={dispatch}
              ACTIONS={ACTIONS}
            />
          </SettingsGroupContainer>
          <div id="practice-settings"></div>
          <SettingsGroupContainer
            title="Practice settings"
            deck="Number cards added each review session"
          >
            <DeckPracticeSettings
              deck={deck}
              dispatch={dispatch}
              ACTIONS={ACTIONS}
            />
          </SettingsGroupContainer>
          <div id="delete-deck"></div>
          <SettingsGroupContainer
            title="Delete deck"
            desc="By deleting this deck, you will lose all the cards of this deck."
          >
            <DeckDeleteSettings deck={deck} deckId={deckId} />
          </SettingsGroupContainer>
          <div id="deck-list" style={{ margin: "0" }}></div>
          <FormLabel text="Flashcards" />
          <SettingsGroupContainer
            title="Modify Flashcards"
            desc="Add, Edit, or Remove cards from the deck"
          >
            <DeckCardlistSettings
              style={{ minHeight: "100vh" }}
              deck={deck}
              dispatch={dispatch}
              ACTIONS={ACTIONS}
            />
          </SettingsGroupContainer>
          <div style={{ minHeight: "60vh" }}></div>
        </>
      )}
    </PageContainer>
  );
}
