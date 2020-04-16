import React, {useState} from 'react';

import MuiCard from '@material-ui/core/Card';

import './Game.css';

const Card = ({cardInfo, className, setCardLocation, children}) => {

  // setCardLocation(cardInfo.id, 'deck');
  return (
      <MuiCard className={"card "+className}>
        {children}
      </MuiCard>
  );
}

export default Card;