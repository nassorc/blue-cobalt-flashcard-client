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
} from "../../../../lib/styled/Search.styled";
import { useEffect } from "react";
import { useRef } from "react";
import Input from "../../../deck/shared/components/Input/Input";

function CheckItem(props: any) {
  const [isChecked, setChecked] = useState(false);
  const { id, text } = props;
  return (
    <div className="my-1">
      <input
        type="checkbox"
        name="check-item"
        id={`checked-item-${id}`}
        value={isChecked}
        onChange={() => {
          setChecked(!isChecked);
        }}
      />
      <label htmlFor={`checked-item-${id}`} className="ml-2">
        {text}
      </label>
    </div>
  );
}
function UserItem(props) {
  const { avatar, fullName } = props;
  return (
    <div className="my-2 px-3 py-2 flex justify-between items-center bg-gray-200 hover:bg-gray-300/70 rounded-lg">
      <div className="flex items-center [&>*]:mr-3">
        <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
        <p>{fullName}</p>
      </div>
      <div>
        <button className="py-2 px-3 bg-white border border-black/50 rounded-lg">
          delete
        </button>
      </div>
    </div>
  );
}

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
      className={`${isOpen ? "h-[510px]" : "h-[110px]"}
                  component-class group relative p-4 shadow-md shadow-black/30 rounded-lg transition-all ease duration-1000 hover:bg-black/5 overflow-hidden
                `}
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
        className={`${
          isOpen ? "opacity-1" : "opacity-0"
        } mt-6 pt-4 transition-all ease duration-700 border-t-2`}
      >
        <div className="flex justify-around">
          <div className="flex flex-col">
            <p className="text-lg">Add User</p>
            <SearchBox>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-nowrap"
              >
                <SearchInput type="text" placeholder="Search" />
                <button className="mx-2 p-3 bg-white border border-black/50 rounded-lg">
                  invite
                </button>
              </form>
            </SearchBox>
            <div className="overflow-y-scroll max-h-[180px]">
              <UserItem fullName="John Doe" />
              <UserItem fullName="Jane Doe" />
              <UserItem fullName="Jane Doe" />
              <UserItem fullName="Jane Doe" />
            </div>
          </div>
          <div>
            <p className="text-lg">Deck List</p>
            <div className="max-h-[180px] overflow-y-scroll">
              <CheckItem id="1" text="Programming Questions 2" />
              <CheckItem id="2" text="Geology Questions" />
              <CheckItem id="3" text="Chapter 1 flashcards in Spanish" />
            </div>
          </div>
        </div>
        <div className="mt-4 float-right">
          <button className="mx-2 p-3 bg-white border border-black/50 rounded-lg">
            cancel
          </button>
          <button className="mx-2 p-3 bg-white border border-black/50 rounded-lg">
            save
          </button>
        </div>
      </div>
    </div>
  );
}
