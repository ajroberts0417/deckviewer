import React, {useState} from 'react';

import DeckModal from './Modal';

import './Game.css';

const Deck = ({cards}) => {

  const [showDeck, setShowDeck] = useState(false);

  return (
      <>
        <div href="#" className="card back deck" onClick={() => setShowDeck(true)}>
          {cards.length}
        </div>
        <DeckModal show={showDeck} handleClose={() => setShowDeck(false)}>
          {cards.map((card) => <div key={card.id}>{JSON.stringify(card.fields)}</div>)}
        </DeckModal>
      </>
  );
}

export default Deck;
