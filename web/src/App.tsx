import React, { useState } from 'react'
import Game from './Game'
import Login from './Login'
import DeckSelection from './DeckSelection'
import DeckBuilder from './deckbuilder/DeckBuilder'
import DefaultDecks from './ApolloTest'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import {DefaultDecks_defaultDecks} from './__generated__/DefaultDecks'

const App: React.FC = () => {
  // TODO: Navbar https://material-ui.com/components/drawers/
  const [deck, setDeck] = useState<DefaultDecks_defaultDecks | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const Logout = (): JSX.Element => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    return <Login setIsLoggedIn={setIsLoggedIn}/>
  }

  const token = localStorage.getItem('token')
  if(!isLoggedIn && token) setIsLoggedIn(true)
  if(isLoggedIn && !token) setIsLoggedIn(false)

  if (!isLoggedIn) return <div className="App"><Login setIsLoggedIn={setIsLoggedIn}/></div>
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
        <Route exact path="/logout">
          <Logout />
        </Route>
      </Switch>
    </div>
  )
}

export default App
