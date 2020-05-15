import React, {useEffect, useState} from 'react'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import Deck from './Deck'
import Card from './Card'

export const Location = {
  DECK: 'deck',
  HAND: 'hand',
  DISCARD: 'discard',
  EXILE: 'exile',
  BATTLEFIELD: 'battlefield',
}
Object.freeze(Location)

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

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
})

const Game = ({deck}) => {
  const history = useHistory()
  if (!deck) history.push('/')

  const classes = useStyles()
  const initialGameState = {
    hand: [],  // array of cards
    deck: [],  // array of cards
    discard: [],  // array of cards
    exile: [],  // array of cards
    battlefield: [],  // array of cards
    cards: {},
  }

  const [gameState, setGameState] = useState(initialGameState)
  const [showDeck, setShowDeck] = useState(false)
  const [showDiscard, setShowDiscard] = useState(false)

  // set the initial game state -- where the deck has all the cards
  useEffect(() => {
    const getCards = async () => {
      const url = `/.netlify/functions/airtable-list/airtable-list?deck=${deck}`
      try {
          const response = await fetch(url)
          const data = await response.json()
          return data
      } catch (err) {
          console.log(err)
      }
    }

    getCards().then((cards) => {
      const cardsTable = {}
      const initialDeck = []

      cards.forEach((card) => {
        cardsTable[card.fields.id] = {...card.fields, location: Location.DECK}  // create a dictionary of cards
        initialDeck.push(card.fields.id)
      })

      shuffle(initialDeck)

      setGameState({...gameState, deck: initialDeck, cards: cardsTable})  // initialize
    })
  }, [])

  const setCardLocation = (cardId, nextLocation) => {
    // get the card from cards
    const card = gameState.cards[cardId]

    if (!card) return

    // create a new array for the removal from prior location
    const oldArrayCopy = [...gameState[card.location]]
    // splice the removed card at the correct index
    oldArrayCopy.splice(oldArrayCopy.indexOf(card.id), 1)

    // create a new array for the addition to a new location
    const newArrayCopy = card.location === nextLocation ? [...oldArrayCopy, card.id] : [...gameState[nextLocation], card.id]

    // update the state of cards, prevLocation, nextLocation
    setGameState(
      {
        ...gameState,
        [card.location]: oldArrayCopy,
        [nextLocation]: newArrayCopy,
        cards: {...gameState.cards, [cardId]: {...gameState.cards[cardId], 'location': nextLocation}},
      },
    )
  }

  const mapCardsByLocation = (location, className, randomOrder) => {
    const cards = [...gameState[location]]
    
    if(randomOrder) { shuffle(cards) }


    return cards.map((cardId) =>
      <Card key={cardId} setCardLocation={setCardLocation} cardInfo={gameState.cards[cardId]} className={className || location}/>
    )
  }

  const reshuffleDiscard = () => {
    // create a new array for all of the cards in the deck

    const newDeck = gameState.deck.concat(gameState.discard)
    console.log(newDeck)

    shuffle(newDeck)

    setGameState({...gameState, deck: newDeck, discard: []})
  }

  return (
      <>
        <div className="battlefield-container">
          {mapCardsByLocation(Location.BATTLEFIELD)}
        </div>
        <div className="discard-container">
          <p className="label">Discard:</p>
          <div href="#" className="card back deck" onClick={() => setShowDiscard(true)}>
            {gameState.discard.length}
          </div>
          <Button classes={{root: classes.button}} size="small" color="secondary" onClick={() => reshuffleDiscard()}>
              Reshuffle
          </Button>
          <Dialog open={showDiscard} onClose={() => setShowDiscard(false)} scroll="paper" maxWidth="lg" className="dialog-content" aria-labelledby="modal-title" aria-describedby="modal-description">
            <DialogContent>
              {mapCardsByLocation(Location.DISCARD, 'dialog', true)}
            </DialogContent>
          </Dialog>
        </div>
        <div className="deck-container">
          <p className="label">
            Deck:
          </p>
          <Deck setCardLocation={setCardLocation} cards={gameState.deck} onClick={() => setShowDeck(true)}/>
          <Button classes={{root: classes.button}} size="small" color="primary" onClick={() => setCardLocation(gameState.deck[0], Location.HAND)}>
              Draw
          </Button>
          <Dialog open={showDeck} onClose={() => setShowDeck(false)} scroll="paper" maxWidth="lg" className="dialog-content" aria-labelledby="modal-title" aria-describedby="modal-description">
            <DialogContent>
              {mapCardsByLocation(Location.DECK, 'dialog', true)}
            </DialogContent>
          </Dialog>
        </div>  
        <p className="hand-container-label">Hand:</p>
        <div className="hand-container">
          {mapCardsByLocation(Location.HAND)}
        </div>
      </>
  )
}

export default Game
