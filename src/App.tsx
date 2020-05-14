import React, { useState } from 'react'
import Game from './Game'
import DeckSelection from './DeckSelection'
import './App.css'
import { Switch, Route } from 'react-router-dom'

const App: React.FC = () => {
  const [deck, setDeck] = useState<number | null>(null)

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

export default App
