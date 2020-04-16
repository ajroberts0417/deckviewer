import React, {useEffect, useState} from 'react';

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

const DeckModal = ({ handleClose, show, children }) => {

  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Deck;
