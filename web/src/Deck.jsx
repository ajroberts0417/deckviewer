import React from 'react'

import './Game.css'

const Deck = ({size, onClick}) => {

  return (
    <div href="#" className="card back deck" onClick={onClick}>
      {size}
    </div>
  )
}

export default Deck
