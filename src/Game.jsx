import React, {useEffect, useState} from 'react';

import Deck from './Deck';
import Card from './Card';

export const Location = {
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
    discard: [],  // array of cards
    exile: [],  // array of cards
    battlefield: [],  // array of cards
    cards: {},
  };

  const [gameState, setGameState] = useState(initialGameState);

  console.log(gameState)

  // set the initial game state -- where the deck has all the cards
  useEffect(() => {
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

    getCards().then((cards) => {
      let cardsTable = {};

      cards.forEach((card) => {
        console.log(card)
        cardsTable[card.fields.id] = {...card.fields, location: Location.DECK}  // create a dictionary of cards
      })

      setGameState({...gameState, deck: cards, cards: cardsTable})  // initialize
    })
  }, [])

  const setCardLocation = (cardId, nextLocation) => {
    // get the card from cards

    console.log("Calling with: ", cardId, " ", nextLocation);

    console.log(gameState.cards)
    const card = gameState.cards[cardId];

    console.log(card)

    // create a new array for the removal from prior location
    let oldArrayCopy = [...gameState[card.location]]
    // splice the removed card at the correct index
    oldArrayCopy.splice(oldArrayCopy.indexOf(card.id), 1);

    // create a new array for the addition to a new location
    console.log("gameState[nextLocation]: ", gameState[nextLocation], "for location:", nextLocation)
    const newArrayCopy = card.location === nextLocation ? [...oldArrayCopy, card.id] : [...gameState[nextLocation], card.id];

    console.log(oldArrayCopy)
    console.log(newArrayCopy)
    // update the state of cards, prevLocation, nextLocation
    setGameState(
      {
        ...gameState,
        [card.location]: oldArrayCopy,
        [nextLocation]: newArrayCopy,
        cards: {...gameState.cards, [cardId]: {...gameState.cards[cardId], 'location': nextLocation}},
      },
    )
  }

  return (
      <>
        <p className="label">Deck:</p>
        <Deck setCardLocation={setCardLocation} cards={gameState.deck}/>
        <p className="label">Hand:</p>
        <div>
          <Card setCardLocation={setCardLocation} cardInfo={gameState.deck[0]?.fields} className="hand" />
          <Card setCardLocation={setCardLocation} cardInfo={gameState.deck[1]?.fields} className="hand" />
          <Card setCardLocation={setCardLocation} cardInfo={gameState.deck[2]?.fields} className="hand" />
          <Card setCardLocation={setCardLocation} cardInfo={gameState.deck[3]?.fields} className="hand" />
        </div>
      </>
  );
}

export default Game;
