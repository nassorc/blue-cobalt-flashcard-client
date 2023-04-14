/**
 * Update review list
 * @param {*} grade card grade
 * @param {*} cardId id of the card being graded
 * @param {*} cards review list
 * @param {*} setCards setter function of the review list
 */
export default function updateReviewList(grade, cardId, cards, setCards) {
    let temp = cards.slice();
    let indexOfCard = temp.indexOf(temp.reduce((current, elm) => (elm._id === cardId) ? elm : current));

    if(grade > 2) {
        // remove card before reposition
        temp.splice(indexOfCard, 1);
        setCards(temp);
    }
    // depending on grade, reposition the card.
    if(grade === 0) {

        let card = temp.splice(indexOfCard, 1)[0];
        temp.splice(1, 0, card);
        setCards(temp);
    }
    else if(grade === 1) {
        let card = temp.splice(indexOfCard, 1)[0];
        temp.splice(cards.length / 2, 0, card);
        setCards(temp);
    } 
    else if(grade === 2) {
        let card = temp.splice(indexOfCard, 1)[0];
        temp.splice(cards.length - 1, 0, card);
        setCards(temp);
    }
}
