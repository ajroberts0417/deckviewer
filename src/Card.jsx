import React from 'react';

import {Location} from './Game';

import MuiCard from '@material-ui/core/Card';
import {Typography, CardContent, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import './Game.css';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    color: 'white',
    height: '10%',
    padding: '0px',
    margin: '1px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
});

const Card = ({cardInfo, className, setCardLocation, children}) => {

let id = null;
let name = null;
let cost = null;
let rulesText = null;
let classType = null;
let range = null;
let attackType = null;

if (cardInfo) {
  id = cardInfo["id"];
  name = cardInfo["cardName"];
  cost = cardInfo["cardCost"];
  rulesText = cardInfo["rulesText"];
  classType = cardInfo["cardClass"];
  range = cardInfo["cardRange"];
  attackType = cardInfo["cardType"];
}

const classes = useStyles();


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
          <br />
          <span style={{margin: '0px', padding: '0px', display: 'inline-block'}}>
            <Button size="small" color="primary" classes={{root: classes.root, label: classes.label}} onClick={() => setCardLocation(id, Location.HAND)}>
              Draw
            </Button>
            <Button classes={{root: classes.root, label: classes.label}} size="small" color="primary" onClick={() => setCardLocation(id, Location.BATTLEFIELD)}>
              Play
            </Button>
          </span>
          <span style={{margin: '0px', padding: '0px', display: 'inline-block'}}>
            <Button classes={{root: classes.root, label: classes.label}} size="small" color="primary" onClick={() => setCardLocation(id, Location.DISCARD)}>
              Discard
            </Button>
            <Button classes={{root: classes.root, label: classes.label}} size="small" color="primary" onClick={() => setCardLocation(id, Location.EXILE)}>
              Exile
            </Button>
          </span>
        </Typography>
        {children}
      </MuiCard>
  );
}

export default Card;