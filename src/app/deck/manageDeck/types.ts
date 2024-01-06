export type CreateDeckFormType = {
  deckName: string;
  deckImage: File | null;
  flashcardPrompt: string;
  blurhash: string;
  isPublic: boolean;
  newCards: number;
  reviewCards: number;
};

export type DialogPropsType = {
  showDialog: boolean;
  setShowDialog: (...args: any) => void;
};
