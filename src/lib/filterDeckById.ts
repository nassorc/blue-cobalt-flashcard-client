// filterDeckById returns deck that matches the id, otherwise returns an empty array.
export default function filterDeckById(decklist: any[], id: string) {
  return decklist
    ? decklist?.reduce((reduced, deck) => (deck._id === id ? deck : reduced))
    : [];
}
