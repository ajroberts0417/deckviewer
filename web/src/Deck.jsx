import React from 'react';

import './Game.css';

const Deck = ({cards, onClick}) => {

  return (
    <div href="#" className="card back deck" onClick={onClick}>
      {cards.length}
    </div>
  );
}

export default Deck;
