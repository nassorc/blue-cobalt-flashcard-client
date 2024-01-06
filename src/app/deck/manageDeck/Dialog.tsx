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
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
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

function ImageUploadGroup({
  values,
  setValues,
}: {
  values: any;
  setValues: (...args: any) => any;
}) {
  return (
    <label className="">
      <div>Deck Image</div>
      <input
        name="deckImage"
        id="deckImage"
        type="file"
        accept="image/png, image/jpeg"
        onChange={setValues}
      />
    </label>
  );
}

function CreateDeckForm({
  values,
  setValues,
}: {
  values: CreateDeckFormType;
  setValues: (...args: any) => any;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div>Deck Info</div>
        <hr />
        <label className="w-full">
          <div>Deck Name</div>
          <input
            type="text"
            name="deckName"
            placeholder=""
            value={values.deckName}
            onChange={setValues}
            className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm w-full"
          />
        </label>

        <ImageUploadGroup values={values} setValues={setValues} />
      </div>

      <div>
        <label>
          <span>turn on ai assist</span>
          <input type="checkbox" />
        </label>
        <label>
          <div>Enter a topic or text to build the flashcard deck off of.</div>
          <textarea className="w-full border border-zinc-500" disabled />
        </label>
      </div>

      <div>
        <div>Deck Settings</div>
        <hr className="border-slate-300" />
        <label className="flex gap-3 items-center justify-end">
          <input
            type="radio"
            value="public"
            checked={values.isPublic}
            name="isPublic"
            onChange={setValues}
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
            checked={!values.isPublic}
            name="isPublic"
            onChange={setValues}
          />
          <div>
            <span>Private</span>
            <span>Only you can see this deck.</span>
          </div>
        </label>
      </div>
      <label>Practice settings</label>
      <hr className="border-slate-300" />
      <p className="text-[0.96rem] text-slate-600 font-light">
        Control the variation of cards added to a review session.
      </p>
      <label className="flex gap-3 items-center justify-end">
        New cards
        <input
          type="text"
          name="newCards"
          value={values.newCards}
          onChange={setValues}
          className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm"
        />
      </label>
      <label className="flex gap-3 items-center justify-end">
        Reviewed cards
        <input
          type="text"
          name="reviewCards"
          value={values.reviewCards}
          onChange={setValues}
          className="px-4 py-[0.4rem] border border-zinc-300 rounded-sm"
        />
      </label>
    </div>
  );
}

let formInitValues = {
  deckName: "",
  deckImage: null,
  flashcardPrompt: "",
  blurhash: "",
  isPublic: false,
  newCards: 5,
  reviewCards: 10,
};

export default function CreateDeckDialog(props: DialogPropsType) {
  const { showDialog, setShowDialog } = props;
  const [taskId, setTaskId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createDeck,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const [formValues, setFormValues] =
    useState<CreateDeckFormType>(formInitValues);

  const handleFormInputs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "file") {
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
    } else if (type === "radio") {
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
  const reset = () => {
    setFormValues(formInitValues);
  };

  return (
    <>
      {showDialog && (
        <>
          <DialogBackdrop {...props} />
          <div
            className="
              p-6 
              absolute left-1/2 top-1/2 z-[99]
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
              You can add flashcards manually after you create the deck. Click
              create when you're done.
            </p>

            <CreateDeckForm values={formValues} setValues={handleFormInputs} />

            <div className="flex gap-2 justify-end">
              <Button className="bg-rose-500 hover:bg-rose-600" onClick={reset}>
                Cancel
              </Button>
              <Button onClick={handleFormSubmit}>Create</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
