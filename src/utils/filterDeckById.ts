// filterDeckById returns deck that matches the id, otherwise returns an empty array.
export default function filterDeckById(decklist, id) {
    return (decklist) 
        ? decklist?.reduce((reduced, deck) => (deck._id === id) ? deck : reduced)
        : []
}