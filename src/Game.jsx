import React, {useEffect, useState} from 'react';

import Deck from './Deck';


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

const Game = () => {

  const initialGameState = {
    hand: [],  // array of cards
    deck: [],  // array of cards
    discardPile: [],  // array of cards
    exile: [],  // array of cards
    battlefield: [],  // array of cards
  };

  const [gameState, setGameState] = useState(initialGameState);

  // set the initial game state -- where the deck has all the cards
  useEffect(() => getCards().then((cards) => setGameState({deck: cards})), [])

  return (
      <>
        <p className="label">Deck:</p>
        <Deck cards={gameState.deck}/>
      </>
  );
}

export default Game;
