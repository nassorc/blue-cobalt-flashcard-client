import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  SearchBox,
  SearchButton,
  SearchInput,
} from "../../../shared/styled/Search.styled";
import { useEffect } from "react";
import { useRef } from "react";

export default function ClassComponent(props) {
  const componentRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { name, desc, studentCount, deckCount } = props;
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest("div.component-class") !== componentRef.current) {
        setOpen(false);
      }
    });
  });
  return (
    <div
      ref={componentRef}
      className="component-class group relative p-4 shadow-md shadow-black/30 rounded-lg transition-all ease duration-500 hover:bg-black/5 overflow-hidden"
    >
      <button
        className="m-4 absolute right-0 -top-14 group-hover:top-0 w-8 h-8 bg-black/50 transition-all ease duration-500 text-white rounded-lg"
        onClick={() => setOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      <p>{name}</p>
      <div>
        <p>{desc}</p>
        <div className="flex justify-between">
          <p>{studentCount} Students</p>
          <p className="w-24">{deckCount} Decks</p>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"
          } transition-all ease duration-500`}
      >
        <div className="flex justify-around">
          <div>Deck list</div>
          <div className="flex flex-col">
            <SearchBox>
              <form onSubmit={(e) => e.preventDefault()}>
                <SearchInput type="text" placeholder="Search" />
                <button>invite</button>
              </form>
            </SearchBox>
            <div>
              <div className="flex justify-around items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                <div>
                  <p>Matthew Crossan</p>
                </div>
                <div>
                  <button>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
