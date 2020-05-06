import React from 'react';


const Decklist = ({deck}) => {
  return deck.map((card) => <div>{card.name}</div>)
}

function Deckbuilder({cards, deck}) {



  return <Decklist />

}