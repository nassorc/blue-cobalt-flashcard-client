import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../shared/context/AuthContext";
import Fuse from "fuse.js";
import BackgroundImage from "/website-bg.jpg";
import FlashcardDeck from "@/components/FlashcardDeck";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import { useDeck } from "@/shared/context/deck";
import FlashcardDeckAddCard from "@/components/FlashcardDeckAddCard";

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
	const [displayDeck, setDisplayDeck] = useState([]);
	const [filteredDeck, setFilteredDeck] = useState([]);
	const [query, setQuery] = useState("");
	// let deckElements = [];
  const deckList = useDeck()
	let fuse;

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
	const deckElements = displayDeck.map((deck: any) => {
    return <FlashcardDeck key={deck._id} deck={deck} />
	});

	const handleAddDeck = () => {
		navigate("/add");
	};
	return (
    <section className="container max-w-5xl">
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

      <div 
        className="mx-auto w-full grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))"
        }}
      >
        <FlashcardDeckAddCard />
				{deckElements}
      </div>
		</section>
	);
}
