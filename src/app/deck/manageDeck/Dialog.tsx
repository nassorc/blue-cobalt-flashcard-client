import { useState } from "react";
import { DialogPropsType, CreateDeckFormType } from "./types";
import { useMutation } from "react-query";
import { queryClient } from "@/components/ContextProvider";
import { createDeck } from "@/lib/api";
import { encode } from "blurhash";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DialogBackdrop from "./DialogBackdrop";

function getImageFileObjectURL(imageFile: File) {
  return URL.createObjectURL(imageFile);
}

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  })
}

function getImageData(image: any) {
  let canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  let ctx = canvas.getContext("2d");
  ctx?.drawImage(image, 0, 0);
  return ctx?.getImageData(0, 0, image.width, image.height);
}

async function generateBlurhash(imageFile: File) {
  try {
    const imageURL = getImageFileObjectURL(imageFile);
    const image = await loadImage(imageURL);
    const imageData = getImageData(image);

    if (imageData) {
      return encode(imageData?.data, imageData?.width, imageData?.height, 4, 4);
    }
    return null;
  } catch (err: any) {
    throw new Error(err);
  }
}

export default function CreateDeckDialog(props: DialogPropsType) {
  const { showDialog, setShowDialog } = props;
  const [taskId, setTaskId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createDeck,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })

  const [formValues, setFormValues] = useState<CreateDeckFormType>({
    deckName: "",
    deckImage: null,
    blurhash: "",
    isPublic: false,
    newCards: 5,
    reviewCards: 10,
  });

  const handleFormInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "radio") {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.value === "public" ? true : false,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const task = await mutation.mutateAsync({
      ...formValues,
      aiAssist: false,
    });
    // console.log("tasks", task);
    // setTaskId(task.taskId);
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && (
        <>
          <DialogBackdrop {...props} />
          <div
            className="
              p-6 
              absolute left-1/2 top-1/2 z-50 
              -translate-x-1/2 -translate-y-1/2
              bg-white rounded-sm 
              border border-zinc-300 shadow-md
            "
          >
            <div className="flex justify-between">
              <h2 className="font-bold">Create Flashcard Deck</h2>
              <Icons.x
                className="scale-75 cursor-pointer"
                onClick={() => setShowDialog(false)}
              />
            </div>
            <p className="text-[0.96rem] text-slate-600 font-light">
              Create a new flashcard Deck. Click add when you're done.
            </p>
            {1 === 1 && (
              <div className="mt-4">
                <div>
                  <div className="flex items-start justify-end">
                    <input
                      type="text"
                      name="deckName"
                      placeholder="Deck Name"
                      value={formValues.deckName}
                      onChange={handleFormInputs}
                      className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm"
                    />
                    <label className="">
                      <div className="aspect-video grid place-items-center bg-gray-200 text-gray-500 border-dashed border-2 border-gray-400">
                        PREVIEW
                      </div>
                      <input
                        name="deckImage"
                        id="deckImage"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                          let file = e.target.files?.item(0) || null;
                          if (file) {
                            // if (formValues.deckImage === null) { return; }
                            const blurhash = await generateBlurhash(file);
                            if (!blurhash) { 
                              console.log("could not encode blurhash");
                              return;
                            }
                            setFormValues((prev) => ({
                              ...prev,
                              blurhash: blurhash,
                              deckImage: file,
                            }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div>Deck Settings</div>
                  <hr className="border-slate-300" />
                  <label className="flex gap-3 items-center justify-end">
                    <input
                      type="radio"
                      value="public"
                      checked={formValues.isPublic}
                      name="isPublic"
                      onChange={handleFormInputs}
                    />
                    <div>
                      <span>Public</span>
                      <span>Anyone can see this deck.</span>
                    </div>
                  </label>
                  <label className="flex gap-3 items-center justify-end">
                    <input
                      type="radio"
                      value="private"
                      checked={!formValues.isPublic}
                      name="isPublic"
                      onChange={handleFormInputs}
                    />
                    <div>
                      <span>Private</span>
                      <span>Only you can see this deck.</span>
                    </div>
                  </label>

                  <label>Practice settings</label>
                  <hr className="border-slate-300" />
                  <p className="text-[0.96rem] text-slate-600 font-light">
                    Control the variation of cards added to the practice
                    session.
                  </p>
                  <label className="flex gap-3 items-center justify-end">
                    New cards
                    <input
                      type="text"
                      name="newCards"
                      value={formValues.newCards}
                      onChange={handleFormInputs}
                      className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm"
                    />
                  </label>
                  <label className="flex gap-3 items-center justify-end">
                    Reviewed cards
                    <input
                      type="text"
                      name="reviewCards"
                      value={formValues.reviewCards}
                      onChange={handleFormInputs}
                      className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm"
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Let AI assist you with creating auto generating flashcards?
                    <Input type="checkbox" />
                  </label>
                  <label>
                    <div>
                      Enter a topic or paste in some text to build the flashcard
                      deck off of.
                    </div>
                    <textarea
                      className="w-full border border-zinc-500"
                      disabled
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button className="bg-website-accent bg-cyan-200 hover:bg-cyan-300 text-black">
                AI Assist
              </Button>
              <Button onClick={handleFormSubmit}>Add</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
