import React, { useState } from 'react';
import Game from './Game';
import DeckSelection from './DeckSelection';
import './App.css';
import { Switch, Route } from 'react-router-dom'

function App() {
  const [deck, setDeck] = useState(null);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <DeckSelection setDeck={setDeck} />
        </Route>
        <Route exact path="/game">
          <Game deck={deck} />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
