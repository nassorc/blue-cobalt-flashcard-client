import { useState } from "react";
import Input from "./Input/Input";
export default function Card({ id, front, back, dispatch, ACTIONS }) {
    const [isEdit, setIsEdit] = useState(false);
    const [frontField, setFrontField] = useState(front.slice());
    const [backField, setBackField] = useState(back.slice());
    const handleDelete = (e) => {
        dispatch({ type: ACTIONS.DELETE_CARD, payload: { cardId: id } });
    };
    const handleEdit = (e) => {
        setFrontField(front);
        setBackField(back);
        setIsEdit(!isEdit);
    };
    const handleUpdate = (e) => {
        dispatch({
            type: ACTIONS.UPDATE_CARD,
            payload: {
                cardId: id,
                updatedCard: {
                    front: frontField,
                    back: backField,
                },
            },
        });

        setIsEdit(!isEdit);
    };
    const handleCancel = (e) => {
        setIsEdit(!isEdit);
    };
    let cardComponent = !isEdit ? (
        <>
            <div>
                <div>
                    <span style={{ fontWeight: "bold" }}> {front}</span>
                </div>

                <div>
                    <span> {back}</span>
                </div>
            </div>

            <div className="[&>*]:mb-2 flex flex-col justify-center items-center">
                <button
                    className="p-2 w-full bg-white border border-black/40 rounded-lg"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="p-2 w-full bg-red-200 border border-black/40 rounded-lg"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </>
    ) : (
        <div className="w-full flex justify-between">
            <div className="w-full flex flex-col">
                <div>
                    {" "}
                    <label>front:</label>
                    <Input
                        value={frontField}
                        onChange={(e) => {
                            setFrontField(e.target.value);
                        }}
                    />
                </div>
                <div>
                    {" "}
                    <label>back:</label>
                    <Input
                        value={backField}
                        onChange={(e) => {
                            setBackField(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="[&>*]:mb-2 flex flex-col justify-center items-center">
                <button
                    className="p-2 w-full bg-white border border-black/40 rounded-lg"
                    onClick={handleUpdate}
                >
                    update
                </button>
                <button
                    className="p-2 w-full bg-white border border-black/40 rounded-lg"
                    onClick={handleCancel}
                >
                    cancel
                </button>
            </div>
        </div>
    );
    return (
        <div className="mt-4 p-2 flex justify-between rounded-lg border border-black/40">
            {cardComponent}
        </div>
    );
}
