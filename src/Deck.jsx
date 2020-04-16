import React, {useState} from 'react';

import { Dialog } from '@material-ui/core';

import './Game.css';

const Deck = ({cards, setCardLocation}) => {

  const [showDeck, setShowDeck] = useState(false);

  return (
      <>
        <div href="#" className="card back deck" onClick={() => setShowDeck(true)}>
          {cards.length}
        </div>

        <Dialog open={showDeck} onClose={() => setShowDeck(false)} aria-labelledby="modal-title" aria-describedby="modal-description">
          {cards.map((card) => <div key={card.id}>{JSON.stringify(card.fields)}</div>)}
        </Dialog>
      </>
  );
}

export default Deck;
