export type CreateDeckFormType = {
  deckName: string;
  deckImage: File | null;
  blurhash: string,
  isPublic: boolean;
  newCards: number;
  reviewCards: number;
};

export type DialogPropsType = {
  showDialog: boolean;
  setShowDialog: (...args: any) => void;
};
