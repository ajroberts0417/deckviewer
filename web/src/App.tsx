import React, { useState } from 'react'
import Game from './Game'
import DeckSelection from './DeckSelection'
import DeckBuilder from './deckbuilder/DeckBuilder'
import DefaultDecks from './ApolloTest'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import {DefaultDecks_defaultDecks} from './__generated__/DefaultDecks'

const App: React.FC = () => {
  const [deck, setDeck] = useState<DefaultDecks_defaultDecks | null>(null)
  // TODO: Navbar https://material-ui.com/components/drawers/
  if (!deck) return <div className="App"><DeckSelection setDeck={setDeck} /></div>
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route exact path="/deckbuilder">
          <DeckBuilder deck={deck} />
        </Route>
        <Route exact path="/game">
          <Game deck={deck} />
        </Route>
        <Route exact path="/apollo-test">
          <DefaultDecks />
        </Route>
      </Switch>
    </div>
  )
}

export default App
