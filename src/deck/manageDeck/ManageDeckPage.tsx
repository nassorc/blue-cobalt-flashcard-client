import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../shared/context/AuthContext";
import styles from "../../shared/assets/styles.module.css";
import {
	DisplayDeck,
	DisplayDeckGridContainer,
} from "../../shared/styled/DisplayDeck.styled";
import { GET_DECKLIST_ENDPOINT } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Deck from "../shared/components/Deck";
import Fuse from "fuse.js";
import {
	SearchBox,
	SearchInput,
	SearchButton,
} from "../../shared/styled/Search.styled";
import BackgroundImage from "/website-bg.jpg";
import FlashcardDeck from "@/components/FlashcardDeck";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";

const fuseOptions = {
	isCaseSensitive: false,
	includeScore: true,
	shouldSort: true,
	findAllMatches: true,
	threshold: 0.2,
	keys: ["deckName"],
};

export default function ManageDeckPage() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [deckList, setDeckList] = useState([]);
	const [displayDeck, setDisplayDeck] = useState([]);
	const [filteredDeck, setFilteredDeck] = useState([]);

	let fuse;
	const [query, setQuery] = useState("");
	let deckElements = [];

	// fetch user flashcards
	useEffect(() => {
    async function getUserDecklist() {
      const res = await fetch('http://localhost:3001/deck/' + localStorage.getItem("userId"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return await res.json()
    }
    getUserDecklist()
      .then(decks => {
				setDeckList(decks?.deckList);
				window.localStorage.setItem("decks", JSON.stringify(decks?.deckList));
      })

		const id = localStorage.getItem("userId");
		fetch(GET_DECKLIST_ENDPOINT(id), {
			headers: {
				Authorization: `Bearer ${authContext.auth.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setDeckList(data?.details);
				window.localStorage.setItem("decks", JSON.stringify(data?.details));
			});
	}, []);

	useEffect(() => {
		fuse = new Fuse(deckList, fuseOptions);
		let searchedList = fuse?.search(query);
		let temp = searchedList.map((item) => item.item);
		setFilteredDeck(temp);
	}, [query]);

	useEffect(() => {
		if (filteredDeck.length > 0) {
			setDisplayDeck(filteredDeck);
		} else {
			setDisplayDeck(deckList);
		}
	}, [deckList, filteredDeck]);

	// map data from fetch request to react component
	deckElements = displayDeck.map((deck: any) => {
    return <FlashcardDeck key={deck._id} deck={deck} />
	});

	const handleAddDeck = () => {
		navigate("/add");
	};
	return (
		<section className={styles["container"]} style={{ alignItems: "center" }}>
			<div
				className="px-4 py-8 bg-cover bg-center bg-no-repeat text-white rounded-lg"
				style={{
					backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${BackgroundImage})`,
				}}
			>
				<h1 className="pl-4 text-2xl font-bold border-l-4 border-red-400">
					Flashcard list
				</h1>
				<p className="text-lg">Manage your flashcards or create a new deck</p>
			</div>

      <div className="my-4 ml-auto relative w-80">
        <Input 
          value={query}
          placeholder="filter decks..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Icons.search className="mx-3 absolute right-0 top-1/2 -translate-y-1/2"/>
      </div>

			<DisplayDeckGridContainer>
				<DisplayDeck
					onClick={(e) => {
						handleAddDeck();
					}}
				>
					<FontAwesomeIcon
						icon={faPlus}
						style={{
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							transform: "scale(2)",
						}}
					/>
				</DisplayDeck>

				{deckElements}
        {/* <FlashcardDeck title="Data structures" id="645c42297525fe53f36bafcd" totalCards={72} completed={18} badges={[100, 101]}/> */}
			</DisplayDeckGridContainer>
		</section>
	);
}
