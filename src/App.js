import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Game from './Game';
import ApolloTest from './ApolloTest';
import './App.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
  })
});

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
  RANGER: 3,
  CLERIC: 4,
}

function App() {
  const classes = useStyles();
  const [deck, setDeck] = useState(null);

  if (deck) return <ApolloProvider client={client}><div className="App"><Game deck={deck} /></div></ApolloProvider>;
  else return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="deck-choice">
          <Button classes={{ root: classes.button }} size="small" color="primary" onClick={() => setDeck(decks.FIGHTER)}>
            Fighter
          </Button>
          <Button classes={{ root: classes.button }} size="small" color="primary" onClick={() => setDeck(decks.WIZARD)}>
            Wizard
          </Button>
          <Button classes={{ root: classes.button }} size="small" color="primary" onClick={() => setDeck(decks.RANGER)}>
            Ranger
          </Button>
          <Button classes={{ root: classes.button }} size="small" color="primary" onClick={() => setDeck(decks.CLERIC)}>
            Cleric
          </Button>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
