import sortByDueDate from "./sortByDueDate";

export default function createReviewSession(
  reviewCards,
  newCards,
  nReview,
  nNew,
) {
  let reviewCardList = sortByDueDate(reviewCards).slice(0, nReview);
  let newCardList = newCards ? newCards.slice(0, nNew) : [];
  return [...reviewCardList, ...newCardList];
}
