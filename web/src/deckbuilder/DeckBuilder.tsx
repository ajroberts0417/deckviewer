import React from 'react'
import DeckList from './DeckList'
import { Card } from '@material-ui/core'
import { DefaultDecks_defaultDecks } from '../__generated__/DefaultDecks'

interface Props {
    deck: DefaultDecks_defaultDecks;
}

interface Card {
  id: number;
  cardName: string;
}

const DeckBuilder: React.FC<Props> = ({deck}) => {

  const completeDeck = [{id: 1, cardName: 'foo'}, {id: 1, cardName: 'foo'}, {id: 2, cardName: 'bar'}, {id: 3, cardName: 'baz'}]

  const reduceDeckToUniqueCards = (deck: Array<Card>): any => {
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

    return (
      <DeckList deck={reduceDeckToUniqueCards(completeDeck)} />
    )
}

export default DeckBuilder
