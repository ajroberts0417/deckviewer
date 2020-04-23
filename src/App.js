import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Game from './Game';
import './App.css';

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: '2.5em',
    padding: '0 30px',
    marginRight: '1.5em',
  },
});

const decks = {
  FIGHTER: 1,
  WIZARD: 2,
}

function App() {
  const classes = useStyles();
  const [deck, setDeck] = useState(null);

  if (deck) return <div className="App"><Game deck={deck}/></div>;
  else return (
    <div className="App">
      <div className="deck-choice">
        <Button classes={{root: classes.button}} size="small" color="primary" onClick={() => setDeck(decks.FIGHTER)}>
          Fighter
        </Button>
        <Button classes={{root: classes.button}} size="small" color="primary" onClick={() => setDeck(decks.WIZARD)}>
          Wizard
        </Button>
      </div>
    </div>
  );
}

export default App;
