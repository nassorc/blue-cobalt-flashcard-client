export default function sortByDueDate(deck) {
  return deck
    ? deck.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    : [];
}
