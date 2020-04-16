import React from 'react';

import MuiCard from '@material-ui/core/Card';
import {Typography, CardContent, CardHeader} from '@material-ui/core';

import './Game.css';

const Card = ({cardInfo, className, setCardLocation, children}) => {


let name = null;
let cost = null;
let rulesText = null;
let classType = null;
let range = null;
let attackType = null;

if (cardInfo) {
  name = cardInfo["Name"];
  cost = cardInfo["cost"];
  rulesText = cardInfo["rules text"];
  classType = cardInfo["class"];
  range = cardInfo["range"];
  attackType = cardInfo["attack type"];
}

  
 // {"id":28,"Name":"Major Magic Missile","cost":3,"rules text":"**Fire 10 missiles divided among up to 10 targets that each deal 1d4 damage**\n","designer":[{"id":"usrZA1KiFv3uSGzoK","email":"ajroberts0417@gmail.com","name":"Andrew Roberts"}],"class":"Wizard","Deck":["recKpeklbKQmcL7pM"],"range":"120 Feet","attack type":"spell"}

  // setCardLocation(cardInfo.id, 'deck');
  return (
      <MuiCard className={"card "+className}>
        <CardContent className="card-header">
          <Typography variant="body1">
            {name}
          </Typography>
          <Typography variant="body1">
            {cost}
          </Typography>
        </CardContent>
        <Typography variant="body2">
          {rulesText}
        </Typography>
        {children}
      </MuiCard>
  );
}

export default Card;