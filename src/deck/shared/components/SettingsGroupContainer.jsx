import deckStyles from "../assets/deck.module.css";

export default function SettingsGroupContainer({ title, desc, children }) {
    return (
        <div className="flex justify-between [&>*]:mb-14 last:border-b ">
            <div>
                <h3 className="text-lg">{title}</h3>
                <p>{desc}</p>
            </div>
            <div>{children}</div>
        </div>
    );
}
