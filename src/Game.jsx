import React, {useEffect, useState} from 'react';

import Deck from './Deck';
import Card from './Card';


const getCards = async () => {
  const url = `/.netlify/functions/airtable-list/airtable-list`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (err) {
      console.log(err);
  }
}

const Location = {
  DECK: 'deck',
  HAND: 'hand',
  DISCARD: 'discard',
  EXILE: 'exile',
  BATTLEFIELD: 'battlefield',
}
Object.freeze(Location)


const Game = () => {

  const initialGameState = {
    hand: [],  // array of cards
    deck: [],  // array of cards
    discardPile: [],  // array of cards
    exile: [],  // array of cards
    battlefield: [],  // array of cards
    cards: {},
  };

  const [gameState, setGameState] = useState(initialGameState);

  // set the initial game state -- where the deck has all the cards
  useEffect(() => getCards().then((cards) => {
    let cardsTable = {};

    for (const card in cards) {
      cardsTable[card.id] = {...card, location: Location.DECK}  // create a dictionary of cards
    }

    setGameState({deck: cards, cards: cardsTable})  // initialize
  }), [])

  const setCardLocation = (cardId, nextLocation) => {
    // get the card from cards
    const card = gameState.cards[cardId];

    // create a new array for the removal from prior location
    let oldArrayCopy = [...gameState[card.location]]
    // splice the removed card at the correct index
    oldArrayCopy.splice(oldArrayCopy.indexOf(card.id), 1);

    // create a new array for the addition to a new location
    const newArrayCopy = [...gameState[nextLocation], card.id];

    // update the state of cards, prevLocation, nextLocation
    setGameState(
      {
        [card.location]: oldArrayCopy,
        [nextLocation]: newArrayCopy,
        cards: {...gameState.cards, [cardId]: {...gameState.cards.cardId, 'location': nextLocation}},
      },
    )
  }

  return (
      <>
        <p className="label">Deck:</p>
        <Deck setCardLocation={setCardLocation} cards={gameState.deck}/>
        <p className="label">Hand:</p>
        <div>
          <Card cardInfo={gameState.deck[0]?.fields}className="hand" />
          <Card cardInfo={gameState.deck[1]?.fields} className="hand" />
          <Card cardInfo={gameState.deck[1]?.fields} className="hand" />
          <Card cardInfo={gameState.deck[1]?.fields} className="hand" />
        </div>
      </>
  );
}

export default Game;
