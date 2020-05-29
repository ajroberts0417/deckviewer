import React from 'react'
import DeckList from './DeckList'
import { Card } from '@material-ui/core'
import { DefaultDecks_defaultDecks, DefaultDecks_defaultDecks_cards } from '../globalTypes'

interface Props {
  deck: DefaultDecks_defaultDecks;
}

const DeckBuilder: React.FC<Props> = ({deck}) => {

  const reduceDeckToUniqueCards = (deck: Array<DefaultDecks_defaultDecks_cards>): any => {
    const uniqueCards: any = {}  // fix any types
    deck.forEach((card) => {
      const cardId = card.id
      if (uniqueCards[cardId]) uniqueCards[cardId].count += 1
      else {
        uniqueCards[cardId] = card
        uniqueCards[cardId].count = 1
      }
    })

    return uniqueCards
  }

  const cards: any = deck?.cards || []  // any type to allow empty array

  return (
    <DeckList deck={reduceDeckToUniqueCards(cards)} />
  )
}

export default DeckBuilder
