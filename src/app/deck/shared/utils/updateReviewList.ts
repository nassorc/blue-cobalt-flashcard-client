/**
 * updateReviewList updates the flashcards depending on the grade.
 * @param {*} grade card grade 0|1|2|3|4|5
 * @param {*} cardId id of the flashcard being graded
 * @param {*} cards flashcard review deck
 * @param {*} setCards Function that sets the value of the flashcard review list
 */
export default function updateReviewList(grade, cardId, cards, setCards) {
  /** Grades
   * grade https://www.npmjs.com/package/supermemo:
   * 5: perfect response.                                                   Flawless
   * 4: correct response after a hesitation.                                very Good | Hesitant
   * 3: correct response recalled with serious difficulty.                  Good |Struggled
   * 2: incorrect response; where the correct one seemed easy to recall.    Failed
   * 1: incorrect response; the correct one remembered.                     Incoorect
   * 0: complete blackout.                                                  Blackout
   */
  /** Grading Process
   * [0 | 1 | 2] - won't be considered a complete review. Depending on what difficult the
   *               user picks, the card will be placed in the pile, closer to the front.
   *             - shouldn't update the current reviewlist, but can make a request to update
   *               the fields needed for the algorithm
   * [3 | 4 | 5] - considered a complete review. Card will be removed from the current cards
   *               being reviewed.
   *             - everytime the user reviews a card, the review list is updated. if a card
   *               is considered very easy, then that card, depending on the sort algorithm
   *               will be placed behind cards that the user considers difficult.
   */
  if (grade < 0 || grade > 5) throw new Error("Grade must be values 0 to 5");
  // create a copy the flashcard deck. This avoids mutating original array
  let temp = cards.slice();
  let indexOfCard = temp.indexOf(
    temp.reduce((current, elm) => (elm._id === cardId ? elm : current)),
  );

  if (grade > 2) {
    // Remove card from current flashcard deck
    temp.splice(indexOfCard, 1);
    setCards(temp);
  } else if (grade === 0) {
    // Reposition
    // splice returns copy of array. This avoids mutating original card
    let card = temp.splice(indexOfCard, 1)[0];
    temp.splice(1, 0, card);
    setCards(temp);
  } else if (grade === 1) {
    // Reposition
    // splice returns copy of array. This avoids mutating original card
    let card = temp.splice(indexOfCard, 1)[0];
    temp.splice(cards.length / 2, 0, card);
    setCards(temp);
  } else if (grade === 2) {
    // Reposition
    // splice returns copy of array. This avoids mutating original card
    let card = temp.splice(indexOfCard, 1)[0];
    temp.splice(cards.length - 1, 0, card);
    setCards(temp);
  }
}
